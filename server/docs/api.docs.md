### **🚀 Updated API Design for CodeMentor**  
(Removed **Voice AI** & added **News/Promotions & LeetCode Integration**)  

---

## **🔹 API Endpoints**

### **1️⃣ User Authentication & Profiles**
#### 🔹 **Auth Routes**
| Method | Endpoint | Description |
|--------|---------|------------|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login with email & password |
| `POST` | `/api/auth/google` | OAuth2.0 Google login |
| `GET` | `/api/auth/logout` | Logout user |
| `GET` | `/api/user/profile` | Get user profile |
| `PUT` | `/api/user/profile` | Update user profile |
| `DELETE` | `/api/user/delete` | Delete user account |

---

### **2️⃣ Coding Challenges & Problem Management**
#### 🔹 **Problem Routes (With LeetCode Integration)**
| Method | Endpoint | Description |
|--------|---------|------------|
| `GET` | `/api/problems` | Get all coding problems |
| `GET` | `/api/problems/:id` | Get a specific problem |
| `POST` | `/api/problems` | Add a new problem (Admin only) |
| `PUT` | `/api/problems/:id` | Update a problem (Admin only) |
| `DELETE` | `/api/problems/:id` | Delete a problem (Admin only) |
| `GET` | `/api/problems/leetcode/:id` | Fetch a problem from LeetCode |

> **ℹ️ LeetCode Integration**  
> - We can use **LeetCode's public API** or scrape problem details.  
> - This will allow users to solve **real LeetCode problems** directly from CodeMentor.

#### 🔹 **User Problem Progress**
| Method | Endpoint | Description |
|--------|---------|------------|
| `POST` | `/api/problems/:id/submit` | Submit code for evaluation |
| `GET` | `/api/problems/:id/solution` | Get solution/hints for a problem |
| `GET` | `/api/user/stats` | Get user's progress stats |

---

### **3️⃣ AI-Powered Code Evaluation**
#### 🔹 **Code Execution & Feedback**
| Method | Endpoint | Description |
|--------|---------|------------|
| `POST` | `/api/code/run` | Run user-submitted code |
| `POST` | `/api/code/evaluate` | AI evaluates the code (time complexity, best approach) |
| `POST` | `/api/code/debug` | AI suggests fixes for errors |
| `GET` | `/api/code/history` | Get past submissions & AI feedback |

---

### **4️⃣ Mock Interviews & AI Interaction**
#### 🔹 **AI Interview Routes**
| Method | Endpoint | Description |
|--------|---------|------------|
| `POST` | `/api/interview/start` | Start a mock interview with AI |
| `GET` | `/api/interview/:id` | Get interview session details |
| `POST` | `/api/interview/submit` | Submit answers during an interview |
| `POST` | `/api/interview/feedback` | AI evaluates the interview & provides feedback |

---

### **5️⃣ Performance Tracking & Analytics**
#### 🔹 **User Analytics Routes**
| Method | Endpoint | Description |
|--------|---------|------------|
| `GET` | `/api/stats` | Get user's performance metrics |
| `GET` | `/api/stats/leaderboard` | Get leaderboard rankings |
| `POST` | `/api/stats/recommendations` | AI suggests personalized study plans |

---

### **6️⃣ Community & Collaboration**
#### 🔹 **Discussion Forum**
| Method | Endpoint | Description |
|--------|---------|------------|
| `GET` | `/api/forum/posts` | Get all discussion posts |
| `POST` | `/api/forum/posts` | Create a new post |
| `GET` | `/api/forum/posts/:id` | Get a specific post & comments |
| `POST` | `/api/forum/posts/:id/comments` | Add a comment to a post |
| `DELETE` | `/api/forum/posts/:id` | Delete a post (Author/Admin) |

#### 🔹 **Live Pair Programming**
| Method | Endpoint | Description |
|--------|---------|------------|
| `POST` | `/api/collab/start` | Start a live coding session |
| `GET` | `/api/collab/session/:id` | Get live session details |
| `POST` | `/api/collab/join` | Join a session with a code |

---

### **7️⃣ Tech News & Job Promotions (LinkedIn & Other Sources)**
#### 🔹 **News & Job Alerts**
| Method | Endpoint | Description |
|--------|---------|------------|
| `GET` | `/api/news` | Get latest tech & coding news |
| `GET` | `/api/news/jobs` | Fetch job postings from LinkedIn, Indeed, etc. |
| `GET` | `/api/news/promotions` | Fetch promotions & coding challenges (e.g., CodeChef, Google Kickstart) |

> **ℹ️ How this Works:**  
> - Use **web scraping (BeautifulSoup/Selenium)** or **LinkedIn API** to pull job posts.  
> - Show latest **coding competitions** & **tech news** from different platforms.  

---
