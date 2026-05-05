#====================================================================================================
# START - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================

# THIS SECTION CONTAINS CRITICAL TESTING INSTRUCTIONS FOR BOTH AGENTS
# BOTH MAIN_AGENT AND TESTING_AGENT MUST PRESERVE THIS ENTIRE BLOCK

# Communication Protocol:
# If the `testing_agent` is available, main agent should delegate all testing tasks to it.
#
# You have access to a file called `test_result.md`. This file contains the complete testing state
# and history, and is the primary means of communication between main and the testing agent.
#
# Main and testing agents must follow this exact format to maintain testing data. 
# The testing data must be entered in yaml format Below is the data structure:
# 
## user_problem_statement: {problem_statement}
## backend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.py"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## frontend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.js"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## metadata:
##   created_by: "main_agent"
##   version: "1.0"
##   test_sequence: 0
##   run_ui: false
##
## test_plan:
##   current_focus:
##     - "Task name 1"
##     - "Task name 2"
##   stuck_tasks:
##     - "Task name with persistent issues"
##   test_all: false
##   test_priority: "high_first"  # or "sequential" or "stuck_first"
##
## agent_communication:
##     -agent: "main"  # or "testing" or "user"
##     -message: "Communication message between agents"

# Protocol Guidelines for Main agent
#
# 1. Update Test Result File Before Testing:
#    - Main agent must always update the `test_result.md` file before calling the testing agent
#    - Add implementation details to the status_history
#    - Set `needs_retesting` to true for tasks that need testing
#    - Update the `test_plan` section to guide testing priorities
#    - Add a message to `agent_communication` explaining what you've done
#
# 2. Incorporate User Feedback:
#    - When a user provides feedback that something is or isn't working, add this information to the relevant task's status_history
#    - Update the working status based on user feedback
#    - If a user reports an issue with a task that was marked as working, increment the stuck_count
#    - Whenever user reports issue in the app, if we have testing agent and task_result.md file so find the appropriate task for that and append in status_history of that task to contain the user concern and problem as well 
#
# 3. Track Stuck Tasks:
#    - Monitor which tasks have high stuck_count values or where you are fixing same issue again and again, analyze that when you read task_result.md
#    - For persistent issues, use websearch tool to find solutions
#    - Pay special attention to tasks in the stuck_tasks list
#    - When you fix an issue with a stuck task, don't reset the stuck_count until the testing agent confirms it's working
#
# 4. Provide Context to Testing Agent:
#    - When calling the testing agent, provide clear instructions about:
#      - Which tasks need testing (reference the test_plan)
#      - Any authentication details or configuration needed
#      - Specific test scenarios to focus on
#      - Any known issues or edge cases to verify
#
# 5. Call the testing agent with specific instructions referring to test_result.md
#
# IMPORTANT: Main agent must ALWAYS update test_result.md BEFORE calling the testing agent, as it relies on this file to understand what to test next.

#====================================================================================================
# END - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================



#====================================================================================================
# Testing Data - Main Agent and testing sub agent both should log testing data below this section
#====================================================================================================

user_problem_statement: "Clonar/replicar exatamente o aplicativo ServiVizinhos (clone do AlloVoisins em PT-BR) a partir do ZIP enviado. Subir frontend (React) + backend (FastAPI/Mongo) com auth JWT, demands, users, messages, reviews e categories."

backend:
  - task: "Auth (register/login/me) JWT"
    implemented: true
    working: true
    file: "backend/routers/auth.py"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: "NA"
          agent: "main"
          comment: "Copiado do ZIP; backend sobe sem erros, indexes criados."
        - working: true
          agent: "testing"
          comment: "✅ ALL AUTH ENDPOINTS WORKING: POST /api/auth/register returns JWT token + user object correctly. POST /api/auth/login authenticates and returns JWT. GET /api/auth/me returns current user with valid token. Tested with realistic Brazilian user data (Maria Silva, João Santos). Password hashing with bcrypt working correctly."
  - task: "Demands CRUD + like/respond"
    implemented: true
    working: true
    file: "backend/routers/demands.py"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: "NA"
          agent: "main"
          comment: "Copiado do ZIP."
        - working: true
          agent: "testing"
          comment: "✅ ALL DEMAND ENDPOINTS WORKING: POST /api/demands/ creates demands with auth. GET /api/demands/ lists all demands. GET /api/demands/:id returns single demand. POST /api/demands/:id/like increments likes. POST /api/demands/:id/respond creates responses. All CRUD operations verified. Minor: FastAPI redirects non-trailing-slash URLs (307) but functionality works correctly."
  - task: "Users / Messages / Reviews / Categories"
    implemented: true
    working: true
    file: "backend/routers/*.py"
    stuck_count: 0
    priority: "medium"
    needs_retesting: false
    status_history:
        - working: "NA"
          agent: "main"
          comment: "Copiado do ZIP."
        - working: true
          agent: "testing"
          comment: "✅ ALL ENDPOINTS WORKING: GET /api/users/ lists users. GET /api/categories/ returns 12 categories. POST /api/messages/ sends messages with auth. GET /api/messages/ retrieves conversations. POST /api/reviews/ creates reviews and updates user ratings. GET /api/reviews/user/:userId returns user reviews. All tested end-to-end with realistic data."

frontend:
  - task: "Landing + Multi-language + Páginas (Home, Demande, Mensagens, Perfil, Empregos, Mapa, Admin)"
    implemented: true
    working: "NA"
    file: "frontend/src/*"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: true
          agent: "main"
          comment: "Landing carregou com layout ServiVizinhos verde/preto, hero, badges, CTA. Não precisa teste auto agora."

metadata:
  created_by: "main_agent"
  version: "1.0"
  test_sequence: 1
  run_ui: false

test_plan:
  current_focus: []
  stuck_tasks: []
  test_all: false
  test_priority: "high_first"

agent_communication:
    - agent: "main"
      message: "Projeto AlloVoisins/ServiVizinhos clonado do ZIP. Frontend e backend rodando. Por favor testar todos os endpoints /api/auth, /api/demands, /api/users, /api/messages, /api/reviews, /api/categories - register, login, me, criar/listar/like/respond demand, listar categorias."
    - agent: "testing"
      message: "✅ BACKEND TESTING COMPLETE - 100% SUCCESS RATE (15/15 tests passed). All endpoints working correctly at https://app-duplication-5.preview.emergentagent.com/api. Tested: health check, categories, auth (register/login/me), users list, demands CRUD, like/respond, messages, reviews. Minor note: FastAPI redirects URLs without trailing slashes (307) but all functionality works correctly. Backend is production-ready."
