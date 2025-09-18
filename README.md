## 🚀 Getting Started

### 1. Clone the repository

<pre class="overflow-visible!" data-start="851" data-end="945"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>git </span><span>clone</span><span> https://github.com/<your-org-or-username>/BetterKRETA.git
</span><span>cd</span><span> BetterKRETA
</span></span></code></div></div></pre>

---

### 2. Backend (Django)

#### Setup

<pre class="overflow-visible!" data-start="988" data-end="1212"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>cd</span><span> backend  </span><span># or project root if manage.py is here</span><span>
python -m venv </span><span>env</span><span>
</span><span># activate venv</span><span>
</span><span>#   On Windows (PowerShell):</span><span>
</span><span>env</span><span>\Scripts\activate
</span><span>#   On Linux / Mac:</span><span>
</span><span>source</span><span> </span><span>env</span><span>/bin/activate

pip install -r requirements.txt
</span></span></code></div></div></pre>

#### Configure environment variables

1. Copy the example file:

   <pre class="overflow-visible!" data-start="1280" data-end="1318"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>cp</span><span> .env.example .</span><span>env</span><span>
   </span></span></code></div></div></pre>

   (Windows PowerShell: `copy .env.example .env`)
2. Open `.env` and set your secret key:

   <pre class="overflow-visible!" data-start="1413" data-end="1482"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-env"><span>SECRET_KEY=replace-me-with-your-secret
   DEBUG=True
   </span></code></div></div></pre>

   To generate a new secure key:

   <pre class="overflow-visible!" data-start="1520" data-end="1644"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>python -c </span><span>"from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"</span><span>
   </span></span></code></div></div></pre>

#### Run migrations

<pre class="overflow-visible!" data-start="1666" data-end="1702"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>python manage.py migrate
</span></span></code></div></div></pre>

#### Start the backend server

<pre class="overflow-visible!" data-start="1734" data-end="1772"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>python manage.py runserver
</span></span></code></div></div></pre>

Backend runs at: **[http://127.0.0.1:8000/](http://127.0.0.1:8000/)**

---

### 3. Frontend (React + Vite + Tailwind)

#### Setup

<pre class="overflow-visible!" data-start="1877" data-end="1912"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>cd</span><span> frontend
npm install
</span></span></code></div></div></pre>

#### Start dev server

<pre class="overflow-visible!" data-start="1936" data-end="1959"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>npm run dev
</span></span></code></div></div></pre>

Frontend runs at: **[http://localhost:5173/](http://localhost:5173/)**

---

### 4. Access the App

* Frontend: `http://localhost:5173`
* Backend API: `http://127.0.0.1:8000/api/...`

---

## 🛠 Notes

* `.env` contains your **SECRET\_KEY** and other settings.
  Never commit `.env` to Git. Instead, share `.env.example`.
* Each developer should create their own `.env` by copying `.env.example`.
* The backend uses **SQLite** locally (`db.sqlite3`), which is ignored in Git.
* For production, configure a real database and update `.env` accordingly.
* All backend dependencies are listed in `requirements.txt`. Run:
  <pre class="overflow-visible!" data-start="2560" data-end="2607"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>pip install -r requirements.txt</span></span></code></div></div></pre>

Generated by: ChatGPT
