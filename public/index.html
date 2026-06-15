<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Curbside</title>
  <script src="https://meet.jit.si/external_api.js"></script>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    :root{--bg:#0b1220;--card:#151f33;--card2:#0f1828;--bd:#26344d;--bd2:#1d2942;--txt:#e7eef7;--mut:#7d8da3;--emer:#10b981;--blue:#3b82f6;--amber:#f59e0b;--red:#ef4444}
    body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Inter,sans-serif;background:linear-gradient(180deg,#0b1220,#0d1526);color:var(--txt);min-height:100vh;padding:24px 16px}
    .container{max-width:960px;margin:0 auto}
    .brand{display:flex;align-items:center;gap:10px;margin-bottom:4px}
    .brand-logo{width:34px;height:34px;border-radius:9px;background:var(--emer);display:flex;align-items:center;justify-content:center;font-weight:800;color:#04130d;font-size:18px}
    h1{font-size:22px;font-weight:700;letter-spacing:-.3px}
    h2{font-size:15px;font-weight:650;margin-bottom:12px;letter-spacing:-.2px}
    .subtitle{color:var(--mut);font-size:13px;margin:2px 0 22px 44px}
    .card{background:var(--card);border:1px solid var(--bd);border-radius:14px;padding:18px;margin-bottom:14px;box-shadow:0 1px 3px rgba(0,0,0,.3)}
    label{display:block;font-size:10.5px;color:var(--mut);margin-bottom:4px;text-transform:uppercase;letter-spacing:.6px;font-weight:600}
    input,select,textarea{width:100%;padding:9px 11px;background:var(--card2);border:1px solid var(--bd);border-radius:9px;color:var(--txt);font-size:14px;margin-bottom:10px;transition:.15s}
    input:focus,select:focus,textarea:focus{outline:none;border-color:var(--emer);box-shadow:0 0 0 3px rgba(16,185,129,.12)}
    textarea{resize:vertical;min-height:68px}
    button{padding:9px 16px;border:none;border-radius:9px;font-size:13.5px;font-weight:650;cursor:pointer;transition:.15s}
    .btn-primary{background:var(--emer);color:#04130d}.btn-primary:hover{background:#0ea372}
    .btn-secondary{background:#243149;color:var(--txt)}.btn-secondary:hover{background:#2d3d59}
    .btn-danger{background:var(--red);color:#fff}.btn-danger:hover{background:#dc2626}
    .btn-sm{padding:6px 11px;font-size:12px}
    .btn-row{display:flex;gap:8px;flex-wrap:wrap;margin-top:8px;align-items:center}
    .row{display:flex;gap:8px}.row>*{flex:1}
    .log{background:var(--card2);border:1px solid var(--bd);border-radius:9px;padding:10px;font-family:ui-monospace,monospace;font-size:11px;color:var(--emer);max-height:150px;overflow-y:auto;white-space:pre-wrap;word-break:break-all;margin-top:10px}
    .hidden{display:none}
    .badge{display:inline-block;padding:2px 8px;border-radius:5px;font-size:9.5px;font-weight:700;text-transform:uppercase;letter-spacing:.4px}
    .badge-gp{background:rgba(16,185,129,.18);color:#34d399}.badge-specialist{background:rgba(59,130,246,.18);color:#60a5fa}
    .badge-admin{background:rgba(245,158,11,.18);color:#fbbf24}
    .badge-routine{background:#243149;color:#9fb0c8}.badge-soon{background:rgba(245,158,11,.18);color:#fbbf24}.badge-urgent{background:rgba(239,68,68,.18);color:#f87171}
    .status{padding:7px 11px;border-radius:9px;font-size:13px;margin-bottom:10px}
    .status-err{background:rgba(239,68,68,.12);border:1px solid rgba(239,68,68,.28);color:#f87171}
    .pill{display:inline-block;padding:5px 11px;border-radius:20px;font-size:12.5px;font-weight:600}
    .pill-wait{background:rgba(59,130,246,.14);color:#60a5fa}.pill-ok{background:rgba(16,185,129,.14);color:#34d399}
    .muted{color:var(--mut);font-size:13px}
    .meta{font-size:13px;color:var(--mut);margin-bottom:8px}
    .ai-box{background:var(--card2);border:1px solid var(--bd);border-radius:9px;padding:10px;font-size:12px;margin:10px 0;line-height:1.65}
    .inbox-item{background:var(--card2);border:1px solid var(--bd);border-radius:10px;padding:12px;margin-bottom:8px}
    .consult-row{background:var(--card2);border:1px solid var(--bd);border-radius:9px;padding:9px 11px;margin-bottom:6px;font-size:13px;cursor:pointer;transition:.12s}
    .consult-row:hover{border-color:var(--emer)}
    .tabs{display:flex;gap:6px;margin-bottom:12px;background:var(--card2);padding:4px;border-radius:10px;border:1px solid var(--bd)}
    .tab{flex:1;padding:7px;border-radius:7px;text-align:center;font-size:12.5px;font-weight:600;cursor:pointer;color:var(--mut)}
    .tab.active{background:var(--card);color:var(--txt)}
    #jitsi-container{border-radius:11px;overflow:hidden;background:#000;margin-bottom:12px;min-height:200px}
    .room-grid{display:grid;grid-template-columns:1fr;gap:12px}
    @media(min-width:820px){.room-grid{grid-template-columns:3fr 2fr}}
    .scribe{background:var(--card2);border:1px solid var(--bd);border-radius:11px;padding:12px;display:flex;flex-direction:column;height:480px}
    #transcript-box{flex:1;overflow-y:auto;font-size:13px;line-height:1.5}
    .t-line{padding:5px 9px;border-radius:7px;margin-bottom:5px}
    .t-gp{background:rgba(16,185,129,.10);border-left:2px solid var(--emer)}.t-spec{background:rgba(59,130,246,.10);border-left:2px solid var(--blue)}
    .t-sp{font-weight:700;font-size:9.5px;text-transform:uppercase;display:block;color:var(--mut)}
    #interim-text{color:var(--mut);font-style:italic;font-size:12px;min-height:15px;margin:4px 0}
    .doc{background:var(--card2);border:1px solid var(--bd);border-radius:9px;padding:12px;margin-bottom:10px}
    .doc-type{font-size:10px;font-weight:700;color:var(--emer);text-transform:uppercase;letter-spacing:.5px;margin-bottom:6px}
    .doc pre{white-space:pre-wrap;font-size:12px;line-height:1.55;font-family:inherit}
    .stats{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
    @media(min-width:700px){.stats{grid-template-columns:repeat(6,1fr)}}
    .stat{background:var(--card2);border:1px solid var(--bd);border-radius:10px;padding:12px;text-align:center}
    .stat-n{display:block;font-size:22px;font-weight:700}.stat-l{font-size:10px;color:var(--mut);text-transform:uppercase;letter-spacing:.4px}
    .user-row{background:var(--card2);border:1px solid var(--bd);border-radius:10px;padding:11px;margin-bottom:8px}
    .dot{display:inline-block;width:8px;height:8px;border-radius:50%;margin-left:4px}.dot-on{background:var(--emer)}.dot-off{background:#64748b}
    .live-row{display:flex;justify-content:space-between;align-items:center;gap:10px;background:var(--card2);border:1px solid rgba(16,185,129,.3);border-radius:10px;padding:11px;margin-bottom:8px}
    .bill-row{background:var(--card2);border:1px solid var(--bd);border-radius:9px;padding:10px;margin-bottom:6px;font-size:13px}
    .audit-row{padding:6px 9px;border-bottom:1px solid var(--bd2);font-size:12px}
    .audit-ev{font-weight:700;color:#60a5fa}
    .note-input{display:flex;gap:8px;margin-top:8px}
    .view-hidden{display:none!important}
    .bill-table{width:100%;border-collapse:collapse;font-size:12.5px}
    .bill-table th{text-align:left;color:var(--mut);font-weight:600;padding:7px 8px;border-bottom:1px solid var(--bd);text-transform:uppercase;font-size:10px;letter-spacing:.4px}
    .bill-table td{padding:7px 8px;border-bottom:1px solid var(--bd2)}
    .doc-acc{background:var(--card2);border:1px solid var(--bd);border-radius:9px;margin-bottom:8px;overflow:hidden}
    .doc-acc summary{padding:11px 13px;cursor:pointer;font-weight:650;font-size:12.5px;text-transform:capitalize;list-style:none;user-select:none}
    .doc-acc summary::-webkit-details-marker{display:none}
    .doc-acc summary:before{content:'▸ ';color:var(--emer)}
    .doc-acc[open] summary:before{content:'▾ '}
    .doc-acc pre{white-space:pre-wrap;font-size:12px;line-height:1.55;font-family:inherit;padding:0 13px}
    .doc-acc .btn-row{padding:0 13px 12px}
    .banner{padding:12px 14px;border-radius:11px;font-size:13.5px;font-weight:600;margin-bottom:14px}
    .banner-ok{background:rgba(16,185,129,.14);border:1px solid rgba(16,185,129,.3);color:#34d399}
    .banner-wait{background:rgba(245,158,11,.14);border:1px solid rgba(245,158,11,.3);color:#fbbf24}
    .banner-err{background:rgba(239,68,68,.14);border:1px solid rgba(239,68,68,.3);color:#f87171}
    a{color:var(--emer)}
  </style>
</head>
<body>
  <div class="container">
    <div class="brand"><div class="brand-logo">C</div><h1>Curbside</h1></div>
    <p class="subtitle">GP–Specialist real-time consultation · live MVP</p>

    <!-- AUTH -->
    <div class="card" id="auth-section">
      <h2>Login or Register</h2>
      <div id="auth-status" class="hidden"></div>
      <div class="row">
        <div><label>Email</label><input type="email" id="email" value="gp@demo.com"></div>
        <div><label>Password</label><input type="password" id="password" value="password123"></div>
      </div>
      <div id="register-fields" class="hidden">
        <div class="row"><div><label>First Name</label><input id="reg-first" placeholder="Amelia"></div><div><label>Last Name</label><input id="reg-last" placeholder="Chen"></div></div>
        <div class="row"><div><label>Role</label><select id="reg-role"><option value="gp">GP</option><option value="specialist">Specialist</option><option value="admin">Admin</option></select></div><div><label>Phone</label><input id="reg-phone" placeholder="+61400000000"></div></div>
        <div class="row"><div><label>AHPRA Number</label><input id="reg-ahpra" placeholder="MED0001234"></div><div><label>Practice</label><input id="reg-practice" placeholder="Bondi Medical"></div></div>
        <div class="row"><div><label>Specialty (specialists)</label><input id="reg-specialty" placeholder="Dermatology"></div><div><label>Qualifications</label><input id="reg-quals" placeholder="MBBS FACD"></div></div>
      </div>
      <div class="btn-row"><button class="btn-primary" id="login-btn" onclick="doLogin()">Login</button><button class="btn-secondary" onclick="toggleRegister()">Toggle Register</button></div>
      <p class="muted" style="margin-top:8px">GP: gp@demo.com · Specialists: derm@ / cardio@ / endo@ / psych@demo.com · Admin: admin@demo.com (all password123)</p>
      <p class="muted" style="color:var(--amber)">⚠️ Test 2 roles: open a 2nd window (Incognito), log in as the other role, allow microphone.</p>
    </div>

    <!-- DASHBOARD -->
    <div id="dashboard" class="hidden">
      <div class="card"><div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px"><div><h2 id="welcome-msg" style="margin:0"></h2><span id="role-badge" class="badge"></span></div><div class="btn-row" style="margin:0"><button class="btn-primary btn-sm" id="nav-dash" onclick="switchView('dashboard')">Dashboard</button><button class="btn-secondary btn-sm" id="nav-bill" onclick="switchView('billing')">💲 Billing</button><button class="btn-secondary btn-sm" onclick="openSettings()">⚙ Settings</button><button class="btn-secondary btn-sm" onclick="doLogout()">Logout</button></div></div></div>

      <!-- BILLING VIEW (separate) -->
      <div id="billing-view" class="hidden">
        <div class="card"><h2>💲 MBS Billing</h2><div id="billing-view-summary" class="stats"></div><p class="muted" id="billing-view-note" style="margin-top:10px"></p></div>
        <div class="card"><div style="display:flex;justify-content:space-between;align-items:center"><h2 style="margin:0">Billed Consults</h2><button class="btn-secondary btn-sm" onclick="loadBillingView()">Refresh</button></div><div id="billing-view-table" style="margin-top:12px"></div></div>
      </div>

      <!-- SETTINGS -->
      <div id="settings-panel" class="card hidden" style="border-color:var(--blue)">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px"><h2 style="margin:0">⚙ Settings</h2><button class="btn-secondary btn-sm" onclick="closeSettings()">Close</button></div>
        <div id="settings-status" class="hidden"></div>
        <h2 style="font-size:13px;margin-top:8px">Change Email</h2>
        <div class="row"><div><label>New Email</label><input id="set-email" type="email"></div><div style="display:flex;align-items:flex-end"><button class="btn-secondary" onclick="changeEmail()" style="margin-bottom:10px">Update Email</button></div></div>
        <h2 style="font-size:13px;margin-top:8px">Change Password</h2>
        <div class="row"><div><label>Current Password</label><input id="set-curpw" type="password"></div><div><label>New Password</label><input id="set-newpw" type="password"></div></div>
        <button class="btn-secondary" onclick="changePassword()">Update Password</button>
      </div>

      <!-- ROOM -->
      <div id="room-section" class="card hidden" style="border-color:var(--emer)">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px"><h2 id="room-title" style="margin:0">Live Consult</h2><div class="btn-row" style="margin:0"><select id="room-location" style="margin:0;width:auto"><option value="in_rooms">In consulting rooms</option><option value="out_rooms">Out of consulting rooms</option><option value="raca">Residential aged care</option></select><button class="btn-danger" onclick="endConsultFromRoom()">⏹ End & Generate Notes</button></div></div>
        <div class="room-grid">
          <div id="jitsi-container"></div>
          <div class="scribe">
            <div style="display:flex;justify-content:space-between;margin-bottom:8px"><strong style="font-size:13px">Live Scribe</strong><span id="transcript-status" class="muted" style="font-size:11px">starting…</span></div>
            <div id="transcript-box"></div>
            <div id="interim-text"></div>
            <div class="row" style="margin-top:6px"><input id="manual-line" placeholder="Type a line if mic unavailable…" style="margin:0"><button class="btn-secondary btn-sm" onclick="addManualLine()">Add</button></div>
          </div>
        </div>
      </div>

      <!-- GP -->
      <div id="gp-panel" class="hidden">
        <div id="gp-banner" class="banner hidden"></div>
        <div id="gp-stats" class="stats hidden" style="margin-bottom:14px"></div>
        <div id="gp-live" class="card hidden" style="border-color:var(--emer)"></div>
        <div class="card">
          <h2 id="consult-form-title">New Consult Request</h2>
          <div class="row"><div><label>Specialty</label><select id="c-specialty"><option>Dermatology</option><option>Cardiology</option><option>Endocrinology</option><option>Psychiatry</option></select></div><div><label>Urgency</label><select id="c-urgency"><option value="routine">Routine</option><option value="soon">Soon</option><option value="urgent">Urgent</option></select></div></div>
          <div class="row"><div><label>Booking</label><select id="c-booking" onchange="onBookingChange()"><option value="on_call">Urgent — On Call (now)</option><option value="scheduled">Scheduled (later)</option></select></div><div id="c-sched-wrap" class="hidden"><label>Scheduled Date/Time</label><input id="c-scheduled" type="datetime-local"></div></div>
          <div class="row"><div><label>Patient First Name</label><input id="c-first" value="Margaret"></div><div><label>Patient Last Name</label><input id="c-last" value="Smith"></div></div>
          <div class="row"><div><label>Medicare #</label><input id="c-medicare" placeholder="2123 45670 1"></div><div><label>IRN</label><input id="c-irn" placeholder="1" style="max-width:80px"></div><div><label>Sex</label><select id="c-sex"><option>F</option><option>M</option><option>Other</option></select></div></div>
          <div class="row"><div><label>Date of Birth</label><input id="c-dob" type="date" value="1957-03-12"></div><div></div></div>
          <label>Case Summary</label><textarea id="c-summary">3wk rash bilateral forearms, started after amlodipine 5mg. Tried HC 1% no improvement. Switch antihypertensive?</textarea>
          <label>Attachments (images, PDFs, labs — optional)</label>
          <input type="file" id="c-files" multiple accept="image/*,.pdf,.txt,.doc,.docx" onchange="onFilesSelected()">
          <div id="c-files-list" class="muted" style="margin-bottom:10px"></div>
          <div class="btn-row"><button class="btn-primary" id="consult-submit" onclick="submitConsult()">Create Consult</button><button class="btn-secondary hidden" id="consult-cancel-edit" onclick="cancelEdit()">Cancel Edit</button></div>
        </div>
        <div id="consult-actions" class="card hidden"></div>
        <div id="gp-billing" class="card"></div>
      </div>

      <!-- SPECIALIST -->
      <div id="spec-panel" class="hidden">
        <div id="spec-stats" class="stats hidden" style="margin-bottom:14px"></div>
        <div id="spec-live" class="card hidden" style="border-color:var(--emer)"></div>
        <div class="card"><h2>Availability</h2><button id="avail-btn" class="btn-secondary" onclick="toggleAvailability()">⚪ Offline</button><p class="muted" style="margin-top:6px">You must be Available to receive broadcasts in your specialty.</p></div>
        <div class="card"><div style="display:flex;justify-content:space-between;align-items:center"><h2 style="margin:0">Incoming (your specialty)</h2><button class="btn-secondary btn-sm" onclick="loadInbox()">Refresh</button></div><div id="spec-inbox" style="margin-top:12px"></div></div>
        <div id="spec-consult-actions" class="card hidden"></div>
        <div id="spec-billing" class="card"></div>
      </div>

      <!-- ADMIN -->
      <div id="admin-panel" class="hidden">
        <div class="card"><h2>Platform Overview</h2><div id="admin-stats" class="stats"></div></div>
        <div class="card"><div style="display:flex;justify-content:space-between;align-items:center"><h2 style="margin:0">GPs</h2><button class="btn-secondary btn-sm" onclick="loadAdminUsers('gp')">Refresh</button></div><div id="admin-gps" style="margin-top:12px"></div></div>
        <div class="card"><div style="display:flex;justify-content:space-between;align-items:center"><h2 style="margin:0">Specialists</h2><button class="btn-secondary btn-sm" onclick="loadAdminUsers('specialist')">Refresh</button></div><div id="admin-specs" style="margin-top:12px"></div></div>
        <div id="admin-billing" class="card"></div>
        <div class="card"><h2>Billing Records</h2><div id="admin-billing-table"></div></div>
        <div class="card"><div style="display:flex;justify-content:space-between;align-items:center"><h2 style="margin:0">Audit Log</h2><button class="btn-secondary btn-sm" onclick="loadAudit()">Refresh</button></div><div id="admin-audit" style="margin-top:12px"></div></div>
        <div id="admin-user-consults" class="card hidden"></div>
        <div id="admin-consult-detail" class="card hidden" style="border-color:var(--blue)"></div>
      </div>

      <!-- DOCS -->
      <div id="docs-panel" class="card hidden"></div>

      <!-- CONSULTS: active vs past -->
      <div id="consults-card" class="card">
        <div class="tabs"><div class="tab active" id="tab-active" onclick="switchTab('active')">Active</div><div class="tab" id="tab-past" onclick="switchTab('past')">Past</div></div>
        <div id="active-list"></div>
        <div id="past-list" class="hidden"></div>
      </div>
    </div>

    <!-- LOG -->
    <div class="card"><div style="display:flex;justify-content:space-between;align-items:center"><h2 style="margin:0">Activity Log</h2><button class="btn-secondary btn-sm" onclick="document.getElementById('log').textContent=''">Clear</button></div><div id="log" class="log">Ready.\n</div></div>
  </div>

  <script src="/app.js"></script>
  <script>
    function switchTab(t){
      document.getElementById('tab-active').classList.toggle('active',t==='active');
      document.getElementById('tab-past').classList.toggle('active',t==='past');
      document.getElementById('active-list').classList.toggle('hidden',t!=='active');
      document.getElementById('past-list').classList.toggle('hidden',t!=='past');
    }
  </script>
</body>
</html>
