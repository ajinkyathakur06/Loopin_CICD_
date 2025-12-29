# 🚀 Deployment & Debugging Report – Loopin (MERN Application)

## Project Overview

**Loopin** is a full-stack MERN social media platform featuring:
- User authentication (JWT + Cookies)
- Posts (image/video)
- Follow system
- Real-time chat (Socket.IO)
- Suggested users & personalized feed

This project was **[developed by batchmate](https://github.com/Sanikasurade/  )** and handed over in a **partially broken state** for deployment.  
My responsibility was to **deploy, debug, and stabilize** the application in a production-like Kubernetes environment.

## Role & Responsibility

**Role:** Deployment Engineer / Debugging & Stabilization

**Scope of Work:**
- Deploy an existing MERN application to Kubernetes
- Debug frontend and backend production issues
- Fix authentication, cookie, and WebSocket problems
- Stabilize the application for real users
- Make the CI/CD pipeline functional

> ⚠️ This was not greenfield development. The challenge was understanding and fixing an unfamiliar codebase under real production constraints.

## Tech Stack

### Application
- React + Vite
- Redux Toolkit
- Axios
- Node.js + Express
- MongoDB
- Socket.IO

### DevOps & Infrastructure
- Docker (multi-stage builds)
- Kubernetes (On-Prem / College Infrastructure)
- NGINX Ingress (RKE2)
- Jenkins CI/CD
- Nexus Docker Registry
- Lens for Kubernetes

## Major Issues Faced & Fixes

### 1️⃣ React Production Crash (Minified Error #321)

#### Symptoms
- Blank screen after deployment
- Error: `Minified React error #321`
- Application worked locally but failed in production

#### Root Cause
- Custom hooks violated **Rules of Hooks**
- Hooks were:
  - Named incorrectly (`getCurrentUser` instead of `useCurrentUser`)
  - Called conditionally or inside `useEffect`

#### Fix
Renamed and refactored hooks:

```text
getCurrentUser.jsx ❌
useCurrentUser.jsx ✅
```

Ensured:

- Hooks are named with use

- Hooks are called at the top level of components


---


### 2️⃣ `.map()` / `.slice()` Runtime Crashes

#### Symptoms
- `TypeError: .slice(...).map is not a function`

#### Root Cause
- Backend APIs occasionally returned:
  - HTML error pages
  - Objects instead of arrays
- Frontend assumed responses were always arrays

#### Fix
Defensive Redux update:

```js
dispatch(setPostData(Array.isArray(result.data) ? result.data : []));

```
UI-level guard:
```jsx
{Array.isArray(postData) && postData.map(...)}
```


---

### 3️⃣ API Returning HTML Instead of JSON

#### Symptoms
- Redux state contained full HTML pages
- `.map()` / `.slice()` failures downstream

#### Root Cause
- Ingress misrouting backend requests
- Errors falling back to `index.html`

#### Fix
Axios response interceptor:

```js
axios.interceptors.response.use((res) => {
  if (typeof res.data === "string" && res.data.includes("<!DOCTYPE html>")) {
    throw new Error("HTML response instead of JSON");
  }
  return res;
});

```
---

### 4️⃣ Authentication Worked but APIs Returned `400`

#### Symptoms
- Login successful
- Authenticated APIs returned `400`

#### Root Cause
- Cookies set with:
  - `secure: true`
  - `sameSite: "None"`
- App accessed over **HTTP**
- Secure cookies are not sent over HTTP

#### Fix
Environment-aware cookies:

```js
const isProd = process.env.NODE_ENV === "production";

res.cookie("token", token, {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? "None" : "Lax",
});
```

Added NODE_ENV=production in Kubernetes secrets.

#### Result

✅ Authentication works in both HTTP & HTTPS environments

---

### 5️⃣ WebSocket Connection Failing (`userId=undefined`)

#### Symptoms
```text
wss://loopin.imcc.com/api/socket.io/?userId=undefined
```
#### Root Cause

- Socket initialized before userData was available

- Incorrect useEffect dependencies

Fix
```js
useEffect(() => {
  if (!userData?._id) return;

  const socketIo = io(import.meta.env.VITE_API_URL, {
    path: "/api/socket.io",
    query: { userId: userData._id },
    transports: ["websocket"],
  });

  return () => socketIo.disconnect();
}, [userData?._id]);
```
#### Result

✅ Stable WebSocket connection
✅ No reconnect loops


---

### 6️⃣ HTTPS / TLS on On-Prem Kubernetes

#### Challenges
- No public CA
- Mostly HTTP network
- No direct node access

#### Fix
- Generated self-signed TLS certificates
- Created Kubernetes TLS Secret via YAML
- Applied TLS Ingress using Lens

#### Result
✅ HTTPS enabled for testing  
⚠️ Browser warnings expected (self-signed cert)


## Final Outcome
- ✅ Application deployed on Kubernetes
- ✅ Frontend stabilized
- ✅ Authentication fixed
- ✅ WebSockets working
- ✅ CI/CD pipeline functional


## Key Learnings
- Debugging production systems requires cross-layer thinking
- Frontend bugs often originate from infra or backend
- Defensive programming is critical
- Cookies, HTTPS, and WebSockets behave differently in production
- Fixing others’ code is a valuable engineering skill

## Resume Highlight
> Debugged and deployed a third-party MERN application on Kubernetes, resolving React production crashes, authentication cookie issues, WebSocket failures, and CI/CD pipeline problems in an on-prem environment.

**Author:** Ajinkya Thakur  
**Role:** Deployment & Debugging Engineer

