import requests
import sys
import json
from datetime import datetime

class WatizatAPITester:
    def __init__(self, base_url="https://fullstack-fix-8.preview.emergentagent.com"):
        self.base_url = base_url
        self.token = None
        self.user_id = None
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name, success, details=""):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name} - PASSED")
        else:
            print(f"❌ {name} - FAILED: {details}")
        
        self.test_results.append({
            "test": name,
            "success": success,
            "details": details
        })

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        if endpoint.startswith('/'):
            url = f"{self.base_url}{endpoint}"
        else:
            url = f"{self.base_url}/api/{endpoint}"
            
        test_headers = {'Content-Type': 'application/json'}
        
        if self.token:
            test_headers['Authorization'] = f'Bearer {self.token}'
        
        if headers:
            test_headers.update(headers)

        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=test_headers, timeout=30)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=test_headers, timeout=30)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=test_headers, timeout=30)

            success = response.status_code == expected_status
            
            if success:
                self.log_test(name, True)
                try:
                    return True, response.json()
                except:
                    return True, response.text
            else:
                error_msg = f"Expected {expected_status}, got {response.status_code}"
                try:
                    error_detail = response.json()
                    error_msg += f" - {error_detail}"
                except:
                    error_msg += f" - {response.text[:200]}"
                
                self.log_test(name, False, error_msg)
                return False, {}

        except Exception as e:
            self.log_test(name, False, f"Exception: {str(e)}")
            return False, {}

    def test_health_endpoint(self):
        """Test GET /health endpoint"""
        return self.run_test("Health Check", "GET", "/health", 200)

    def test_root_endpoint(self):
        """Test GET / endpoint"""
        return self.run_test("Root Endpoint", "GET", "/", 200)

    def test_api_root_endpoint(self):
        """Test GET /api/ endpoint"""
        return self.run_test("API Root", "GET", "", 200)

    def test_help_locations_categories(self):
        """Test GET /api/help-locations/categories endpoint"""
        success, response = self.run_test(
            "Help Locations Categories",
            "GET",
            "help-locations/categories",
            200
        )
        
        if success and isinstance(response, dict) and 'categories' in response:
            categories = response['categories']
            
            # Check if we have expected categories
            expected_categories = ['food', 'health', 'legal', 'housing', 'clothes', 'social', 'education', 'work']
            found_categories = [cat['value'] for cat in categories if cat['value'] != 'all']
            
            # Check if each category has required fields
            all_have_required_fields = True
            for cat in categories:
                if cat['value'] == 'all':
                    if not ('icon' in cat and 'count' in cat):
                        all_have_required_fields = False
                        break
                else:
                    if not ('icon' in cat and 'color' in cat and 'count' in cat):
                        all_have_required_fields = False
                        break
            
            has_expected_categories = all(cat in found_categories for cat in expected_categories)
            
            if all_have_required_fields and has_expected_categories:
                self.log_test("Categories Structure Validation", True, f"Found {len(categories)} categories with proper structure")
                return True
            else:
                error_msg = []
                if not all_have_required_fields:
                    error_msg.append("Missing required fields")
                if not has_expected_categories:
                    missing = [cat for cat in expected_categories if cat not in found_categories]
                    error_msg.append(f"Missing categories: {missing}")
                self.log_test("Categories Structure Validation", False, "; ".join(error_msg))
        
        return False

    def test_user_registration(self):
        """Test POST /api/auth/register endpoint"""
        timestamp = datetime.now().strftime('%H%M%S')
        test_user_data = {
            "email": f"test_migrant_{timestamp}@example.com",
            "password": "TestPass123!",
            "name": f"Test Migrant {timestamp}",
            "role": "migrant",
            "languages": ["pt", "fr"]
        }
        
        success, response = self.run_test(
            "User Registration",
            "POST",
            "auth/register",
            200,
            data=test_user_data
        )
        
        if success and 'token' in response:
            self.token = response['token']
            self.user_id = response['user']['id']
            return True
        return False

    def test_user_login(self):
        """Test POST /api/auth/login endpoint"""
        # Create a test user first
        timestamp = datetime.now().strftime('%H%M%S')
        test_user_data = {
            "email": f"test_login_{timestamp}@example.com",
            "password": "TestPass123!",
            "name": f"Test Login {timestamp}",
            "role": "migrant",
            "languages": ["pt", "fr"]
        }
        
        # Register first
        success, response = self.run_test(
            "Register User for Login Test",
            "POST",
            "auth/register",
            200,
            data=test_user_data
        )
        
        if not success:
            return False
        
        # Now test login
        login_data = {
            "email": test_user_data["email"],
            "password": test_user_data["password"]
        }
        
        success, response = self.run_test(
            "User Login",
            "POST", 
            "auth/login",
            200,
            data=login_data
        )
        
        if success and 'token' in response:
            # Don't overwrite the main token, just verify login works
            return True
        return False

    def test_ai_chat_mocked(self):
        """Test POST /api/ai/chat endpoint (should return mocked response)"""
        if not self.token:
            self.log_test("AI Chat - No Token", False, "No authentication token available")
            return False
            
        chat_data = {
            "message": "Onde posso encontrar comida gratuita em Paris?",
            "language": "pt"
        }
        
        success, response = self.run_test(
            "AI Chat (Mocked)",
            "POST",
            "ai/chat",
            200,
            data=chat_data
        )
        
        if success and 'response' in response:
            # Check if it's the mocked response
            response_text = response['response']
            if "assistente de IA do Watizat está temporariamente indisponível" in response_text:
                self.log_test("AI Chat Mocked Response", True, "Correctly returned mocked response")
                return True
            else:
                self.log_test("AI Chat Mocked Response", False, f"Unexpected response: {response_text[:100]}")
        return False

    def run_basic_tests(self):
        """Run the basic tests as specified in the review request"""
        print("🚀 Starting Watizat Backend Tests...")
        print(f"📍 Base URL: {self.base_url}")
        
        # Test 1: GET /health
        print("\n📝 Step 1: Test health endpoint")
        self.test_health_endpoint()
        
        # Test 2: GET /
        print("\n📝 Step 2: Test root endpoint")
        self.test_root_endpoint()
        
        # Test 3: GET /api/
        print("\n📝 Step 3: Test API root endpoint")
        self.test_api_root_endpoint()
        
        # Test 4: GET /api/help-locations/categories
        print("\n📝 Step 4: Test help locations categories")
        self.test_help_locations_categories()
        
        # Test 5: POST /api/auth/register
        print("\n📝 Step 5: Test user registration")
        if not self.test_user_registration():
            print("⚠️  Registration failed, some tests may not work")
        
        # Test 6: POST /api/auth/login
        print("\n📝 Step 6: Test user login")
        self.test_user_login()
        
        # Test 7: POST /api/ai/chat (mocked)
        print("\n📝 Step 7: Test AI chat (mocked)")
        self.test_ai_chat_mocked()
        
        return True

    def print_summary(self):
        """Print test summary"""
        print(f"\n📊 Test Summary:")
        print(f"   Tests Run: {self.tests_run}")
        print(f"   Tests Passed: {self.tests_passed}")
        print(f"   Success Rate: {(self.tests_passed/self.tests_run)*100:.1f}%")
        
        if self.tests_passed < self.tests_run:
            print(f"\n❌ Failed Tests:")
            for result in self.test_results:
                if not result['success']:
                    print(f"   - {result['test']}: {result['details']}")
        
        return self.tests_passed == self.tests_run

def main():
    tester = WatizatAPITester()
    
    try:
        # Run basic tests as specified in review request
        tester.run_basic_tests()
        success = tester.print_summary()
        return 0 if success else 1
    except KeyboardInterrupt:
        print("\n⚠️  Tests interrupted by user")
        return 1
    except Exception as e:
        print(f"\n💥 Unexpected error: {str(e)}")
        return 1

if __name__ == "__main__":
    sys.exit(main())