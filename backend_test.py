#!/usr/bin/env python3
"""
Backend API Test Suite for AlloVoisins/ServiVizinhos Clone
Tests all endpoints at https://app-duplication-5.preview.emergentagent.com/api
"""

import requests
import json
from datetime import datetime

# Base URL from frontend/.env
BASE_URL = "https://app-duplication-5.preview.emergentagent.com/api"

# Test data storage
test_data = {
    "user1": {},
    "user2": {},
    "demand": {},
    "message": {},
    "review": {}
}

def print_test(test_name, passed, details=""):
    """Print test result"""
    status = "✅ PASS" if passed else "❌ FAIL"
    print(f"{status} - {test_name}")
    if details:
        print(f"   Details: {details}")
    print()

def test_health_check():
    """Test 1: GET /api/ -> health/version response"""
    print("=" * 60)
    print("TEST 1: Health Check")
    print("=" * 60)
    try:
        response = requests.get(f"{BASE_URL}/")
        passed = response.status_code == 200 and "message" in response.json()
        print_test("GET /api/", passed, f"Status: {response.status_code}, Response: {response.json()}")
        return passed
    except Exception as e:
        print_test("GET /api/", False, f"Error: {str(e)}")
        return False

def test_get_categories():
    """Test 2: GET /api/categories -> list of categories"""
    print("=" * 60)
    print("TEST 2: Get Categories")
    print("=" * 60)
    try:
        response = requests.get(f"{BASE_URL}/categories")
        data = response.json()
        passed = response.status_code == 200 and isinstance(data, list) and len(data) > 0
        print_test("GET /api/categories", passed, f"Status: {response.status_code}, Categories count: {len(data) if isinstance(data, list) else 0}")
        return passed
    except Exception as e:
        print_test("GET /api/categories", False, f"Error: {str(e)}")
        return False

def test_register_user():
    """Test 3: POST /api/auth/register -> returns JWT token + user"""
    print("=" * 60)
    print("TEST 3: User Registration")
    print("=" * 60)
    
    # Register User 1
    user1_data = {
        "name": "Maria Silva",
        "email": f"maria.silva.{datetime.now().timestamp()}@example.com",
        "password": "SenhaSegura123!",
        "location": "São Paulo, SP",
        "phone": "+55 11 98765-4321"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/auth/register", json=user1_data)
        data = response.json()
        
        if response.status_code == 200:
            passed = "access_token" in data and "user" in data
            if passed:
                test_data["user1"]["token"] = data["access_token"]
                test_data["user1"]["id"] = data["user"]["id"]
                test_data["user1"]["email"] = user1_data["email"]
                test_data["user1"]["password"] = user1_data["password"]
            print_test("POST /api/auth/register (User 1)", passed, f"Token received: {passed}, User ID: {data.get('user', {}).get('id', 'N/A')}")
        else:
            print_test("POST /api/auth/register (User 1)", False, f"Status: {response.status_code}, Response: {data}")
            return False
    except Exception as e:
        print_test("POST /api/auth/register (User 1)", False, f"Error: {str(e)}")
        return False
    
    # Register User 2 for messaging/review tests
    user2_data = {
        "name": "João Santos",
        "email": f"joao.santos.{datetime.now().timestamp()}@example.com",
        "password": "OutraSenha456!",
        "location": "Rio de Janeiro, RJ",
        "phone": "+55 21 91234-5678"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/auth/register", json=user2_data)
        data = response.json()
        
        if response.status_code == 200:
            passed = "access_token" in data and "user" in data
            if passed:
                test_data["user2"]["token"] = data["access_token"]
                test_data["user2"]["id"] = data["user"]["id"]
                test_data["user2"]["email"] = user2_data["email"]
                test_data["user2"]["password"] = user2_data["password"]
            print_test("POST /api/auth/register (User 2)", passed, f"Token received: {passed}, User ID: {data.get('user', {}).get('id', 'N/A')}")
            return passed
        else:
            print_test("POST /api/auth/register (User 2)", False, f"Status: {response.status_code}, Response: {data}")
            return False
    except Exception as e:
        print_test("POST /api/auth/register (User 2)", False, f"Error: {str(e)}")
        return False

def test_login():
    """Test 4: POST /api/auth/login -> returns JWT"""
    print("=" * 60)
    print("TEST 4: User Login")
    print("=" * 60)
    
    login_data = {
        "email": test_data["user1"]["email"],
        "password": test_data["user1"]["password"]
    }
    
    try:
        response = requests.post(f"{BASE_URL}/auth/login", json=login_data)
        data = response.json()
        passed = response.status_code == 200 and "access_token" in data and "user" in data
        print_test("POST /api/auth/login", passed, f"Status: {response.status_code}, Token received: {'access_token' in data}")
        return passed
    except Exception as e:
        print_test("POST /api/auth/login", False, f"Error: {str(e)}")
        return False

def test_get_me():
    """Test 5: GET /api/auth/me -> returns current user"""
    print("=" * 60)
    print("TEST 5: Get Current User")
    print("=" * 60)
    
    headers = {"Authorization": f"Bearer {test_data['user1']['token']}"}
    
    try:
        response = requests.get(f"{BASE_URL}/auth/me", headers=headers)
        data = response.json()
        passed = response.status_code == 200 and "id" in data and "email" in data
        print_test("GET /api/auth/me", passed, f"Status: {response.status_code}, User ID: {data.get('id', 'N/A')}")
        return passed
    except Exception as e:
        print_test("GET /api/auth/me", False, f"Error: {str(e)}")
        return False

def test_get_users():
    """Test 6: GET /api/users -> list of users"""
    print("=" * 60)
    print("TEST 6: Get Users List")
    print("=" * 60)
    
    try:
        response = requests.get(f"{BASE_URL}/users")
        data = response.json()
        passed = response.status_code == 200 and isinstance(data, list)
        print_test("GET /api/users", passed, f"Status: {response.status_code}, Users count: {len(data) if isinstance(data, list) else 0}")
        return passed
    except Exception as e:
        print_test("GET /api/users", False, f"Error: {str(e)}")
        return False

def test_create_demand():
    """Test 7: POST /api/demands -> create a demand"""
    print("=" * 60)
    print("TEST 7: Create Demand")
    print("=" * 60)
    
    headers = {"Authorization": f"Bearer {test_data['user1']['token']}"}
    demand_data = {
        "title": "Preciso de ajuda com encanamento",
        "description": "Tenho um vazamento na cozinha que precisa ser consertado urgentemente. O problema está embaixo da pia.",
        "category": "Plomberie",
        "budget": "R$ 150-300",
        "location": "São Paulo, SP - Zona Sul"
    }
    
    try:
        # Use trailing slash to avoid redirect
        response = requests.post(f"{BASE_URL}/demands/", json=demand_data, headers=headers, allow_redirects=False)
        
        # If redirected, follow with correct method
        if response.status_code == 307:
            response = requests.post(response.headers['Location'], json=demand_data, headers=headers)
        
        data = response.json()
        passed = response.status_code == 200 and "id" in data
        if passed:
            test_data["demand"]["id"] = data["id"]
        print_test("POST /api/demands", passed, f"Status: {response.status_code}, Demand ID: {data.get('id', 'N/A')}")
        return passed
    except Exception as e:
        print_test("POST /api/demands", False, f"Error: {str(e)}")
        return False

def test_get_demands():
    """Test 8: GET /api/demands -> list demands"""
    print("=" * 60)
    print("TEST 8: Get Demands List")
    print("=" * 60)
    
    try:
        response = requests.get(f"{BASE_URL}/demands")
        data = response.json()
        passed = response.status_code == 200 and isinstance(data, list)
        print_test("GET /api/demands", passed, f"Status: {response.status_code}, Demands count: {len(data) if isinstance(data, list) else 0}")
        return passed
    except Exception as e:
        print_test("GET /api/demands", False, f"Error: {str(e)}")
        return False

def test_get_single_demand():
    """Test 9: GET /api/demands/:id -> single demand"""
    print("=" * 60)
    print("TEST 9: Get Single Demand")
    print("=" * 60)
    
    demand_id = test_data["demand"]["id"]
    
    try:
        response = requests.get(f"{BASE_URL}/demands/{demand_id}")
        data = response.json()
        passed = response.status_code == 200 and data.get("id") == demand_id
        print_test(f"GET /api/demands/{demand_id}", passed, f"Status: {response.status_code}, Demand title: {data.get('title', 'N/A')}")
        return passed
    except Exception as e:
        print_test(f"GET /api/demands/{demand_id}", False, f"Error: {str(e)}")
        return False

def test_like_demand():
    """Test 10: POST /api/demands/:id/like -> like demand"""
    print("=" * 60)
    print("TEST 10: Like Demand")
    print("=" * 60)
    
    demand_id = test_data["demand"]["id"]
    headers = {"Authorization": f"Bearer {test_data['user2']['token']}"}
    
    try:
        response = requests.post(f"{BASE_URL}/demands/{demand_id}/like", headers=headers)
        data = response.json()
        passed = response.status_code == 200 and data.get("success") == True
        print_test(f"POST /api/demands/{demand_id}/like", passed, f"Status: {response.status_code}, Response: {data}")
        return passed
    except Exception as e:
        print_test(f"POST /api/demands/{demand_id}/like", False, f"Error: {str(e)}")
        return False

def test_respond_to_demand():
    """Test 11: POST /api/demands/:id/respond -> respond to demand"""
    print("=" * 60)
    print("TEST 11: Respond to Demand")
    print("=" * 60)
    
    demand_id = test_data["demand"]["id"]
    headers = {"Authorization": f"Bearer {test_data['user2']['token']}"}
    response_data = {
        "demandId": demand_id,
        "message": "Olá! Sou encanador profissional com 10 anos de experiência. Posso resolver seu problema hoje mesmo. Quando seria melhor para você?"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/demands/{demand_id}/respond", json=response_data, headers=headers)
        data = response.json()
        passed = response.status_code == 200 and "id" in data
        print_test(f"POST /api/demands/{demand_id}/respond", passed, f"Status: {response.status_code}, Response ID: {data.get('id', 'N/A')}")
        return passed
    except Exception as e:
        print_test(f"POST /api/demands/{demand_id}/respond", False, f"Error: {str(e)}")
        return False

def test_get_messages():
    """Test 12: GET /api/messages -> get conversations"""
    print("=" * 60)
    print("TEST 12: Get Messages")
    print("=" * 60)
    
    headers = {"Authorization": f"Bearer {test_data['user1']['token']}"}
    
    try:
        # Use trailing slash to avoid redirect
        response = requests.get(f"{BASE_URL}/messages/", headers=headers)
        data = response.json()
        passed = response.status_code == 200 and isinstance(data, list)
        print_test("GET /api/messages", passed, f"Status: {response.status_code}, Messages count: {len(data) if isinstance(data, list) else 0}")
        return passed
    except Exception as e:
        print_test("GET /api/messages", False, f"Error: {str(e)}")
        return False

def test_send_message():
    """Test 13: POST /api/messages -> send message"""
    print("=" * 60)
    print("TEST 13: Send Message")
    print("=" * 60)
    
    headers = {"Authorization": f"Bearer {test_data['user1']['token']}"}
    message_data = {
        "toUserId": test_data["user2"]["id"],
        "message": "Olá João! Vi sua resposta sobre o encanamento. Podemos conversar mais sobre o serviço?",
        "demandId": test_data["demand"]["id"]
    }
    
    try:
        # Use trailing slash to avoid redirect
        response = requests.post(f"{BASE_URL}/messages/", json=message_data, headers=headers)
        data = response.json()
        passed = response.status_code == 200 and "id" in data
        if passed:
            test_data["message"]["id"] = data["id"]
        print_test("POST /api/messages", passed, f"Status: {response.status_code}, Message ID: {data.get('id', 'N/A')}")
        return passed
    except Exception as e:
        print_test("POST /api/messages", False, f"Error: {str(e)}")
        return False

def test_create_review():
    """Test 14: POST /api/reviews -> create review"""
    print("=" * 60)
    print("TEST 14: Create Review")
    print("=" * 60)
    
    headers = {"Authorization": f"Bearer {test_data['user1']['token']}"}
    review_data = {
        "toUserId": test_data["user2"]["id"],
        "rating": 5,
        "comment": "Excelente profissional! Resolveu o problema rapidamente e com qualidade. Muito educado e pontual. Recomendo!"
    }
    
    try:
        # Use trailing slash to avoid redirect
        response = requests.post(f"{BASE_URL}/reviews/", json=review_data, headers=headers)
        data = response.json()
        passed = response.status_code == 200 and "id" in data
        if passed:
            test_data["review"]["id"] = data["id"]
        print_test("POST /api/reviews", passed, f"Status: {response.status_code}, Review ID: {data.get('id', 'N/A')}")
        return passed
    except Exception as e:
        print_test("POST /api/reviews", False, f"Error: {str(e)}")
        return False

def test_get_user_reviews():
    """Test 15: GET /api/reviews/user/:userId -> get user reviews"""
    print("=" * 60)
    print("TEST 15: Get User Reviews")
    print("=" * 60)
    
    user_id = test_data["user2"]["id"]
    
    try:
        response = requests.get(f"{BASE_URL}/reviews/user/{user_id}")
        data = response.json()
        passed = response.status_code == 200 and isinstance(data, list)
        print_test(f"GET /api/reviews/user/{user_id}", passed, f"Status: {response.status_code}, Reviews count: {len(data) if isinstance(data, list) else 0}")
        return passed
    except Exception as e:
        print_test(f"GET /api/reviews/user/{user_id}", False, f"Error: {str(e)}")
        return False

def run_all_tests():
    """Run all backend tests"""
    print("\n" + "=" * 60)
    print("BACKEND API TEST SUITE - AlloVoisins/ServiVizinhos Clone")
    print("=" * 60)
    print(f"Base URL: {BASE_URL}")
    print(f"Test started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 60 + "\n")
    
    results = {}
    
    # Run tests in order
    results["health_check"] = test_health_check()
    results["categories"] = test_get_categories()
    results["register"] = test_register_user()
    
    # Only continue if registration succeeded
    if results["register"]:
        results["login"] = test_login()
        results["get_me"] = test_get_me()
        results["get_users"] = test_get_users()
        results["create_demand"] = test_create_demand()
        
        # Only continue if demand creation succeeded
        if results["create_demand"]:
            results["get_demands"] = test_get_demands()
            results["get_single_demand"] = test_get_single_demand()
            results["like_demand"] = test_like_demand()
            results["respond_to_demand"] = test_respond_to_demand()
            results["get_messages"] = test_get_messages()
            results["send_message"] = test_send_message()
            results["create_review"] = test_create_review()
            results["get_user_reviews"] = test_get_user_reviews()
    
    # Print summary
    print("\n" + "=" * 60)
    print("TEST SUMMARY")
    print("=" * 60)
    
    passed_count = sum(1 for v in results.values() if v)
    total_count = len(results)
    
    print(f"Total Tests: {total_count}")
    print(f"Passed: {passed_count}")
    print(f"Failed: {total_count - passed_count}")
    print(f"Success Rate: {(passed_count/total_count*100):.1f}%")
    
    print("\nDetailed Results:")
    for test_name, passed in results.items():
        status = "✅ PASS" if passed else "❌ FAIL"
        print(f"  {status} - {test_name}")
    
    print("=" * 60 + "\n")
    
    return results

if __name__ == "__main__":
    run_all_tests()
