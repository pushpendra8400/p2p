# Quick Test Guide - MY_VEHICLES & SETTINGS Pages

## 🚀 Getting Started

### 1. Start Development Server
```bash
npm run dev
```
Then open: `http://localhost:5173/p2p/`

### 2. Login (Demo Mode)
- Click "Login" or go to `/login`
- Use any email (e.g., `test@example.com`)
- Any password works in demo

### 3. Access the Pages
- **MY VEHICLES:** Click "My Vehicles" in sidebar or go to `/driver/vehicles`
- **DRIVER SETTINGS:** Click "Settings" in sidebar or go to `/driver/settings`
- **HOST SETTINGS:** Switch to Host role, go to `/host/settings`

---

## ✅ Test Scenarios

### Test 1: Add Vehicle
**Expected:** Vehicle appears in list, saves to localStorage

**Steps:**
1. Go to `/driver/vehicles`
2. Click "Add Vehicle"
3. Fill form:
   - Name: "Honda City"
   - Type: Click "🚗 Sedan"
   - Plate: "MH 02 AB 1234"
   - Color: "White"
4. Check "Set as default"
5. Click "Add Vehicle"

**Verify:**
- ✅ Toast: "Vehicle added successfully"
- ✅ Vehicle card appears
- ✅ "Default" badge visible
- ✅ Refresh page → Vehicle persists

---

### Test 2: Validate License Plate
**Expected:** Only Indian format accepted

**Steps:**
1. Go to `/driver/vehicles`
2. Click "Add Vehicle"
3. Try these plates:
   - Type "ABC1234" → Error: "Invalid format"
   - Type "mh02ab1234" → Auto-formats to "MH 02 AB 1234"
   - Type "MH 02 AB 5678" → Success

**Verify:**
- ✅ Invalid format rejected
- ✅ Auto-formats as typing
- ✅ Auto-uppercase applied

---

### Test 3: Duplicate Plate Detection
**Expected:** Prevents adding same plate twice

**Steps:**
1. Add vehicle with plate "MH 02 AB 1234"
2. Try adding another with same plate
3. Click "Add Vehicle"

**Verify:**
- ✅ Error: "This license plate already exists"
- ✅ Submit button disabled

---

### Test 4: Edit Vehicle
**Expected:** Modal opens with current data

**Steps:**
1. Click ✏️ icon on vehicle card
2. Change name to "Honda City 2023"
3. Change color to "Black"
4. Click "Update Vehicle"

**Verify:**
- ✅ Toast: "Vehicle updated"
- ✅ Card shows new data
- ✅ localStorage updated

---

### Test 5: Delete Vehicle
**Expected:** Confirmation dialog shows

**Steps:**
1. Click 🗑️ icon on vehicle card
2. Modal appears asking confirmation
3. Click "Delete"

**Verify:**
- ✅ Vehicle removed from list
- ✅ localStorage updated
- ✅ Toast appears

---

### Test 6: Set Default Vehicle
**Expected:** Only one vehicle marked as default

**Steps:**
1. Add 2 vehicles
2. Click "Set Default" on second vehicle
3. Observe first vehicle

**Verify:**
- ✅ "Default" badge moves
- ✅ Only one default at a time
- ✅ localStorage updated

---

### Test 7: Responsive Vehicles Grid
**Expected:** Columns change by screen size

**Steps:**
1. Add 3-4 vehicles
2. Resize browser:
   - 375px (mobile) → 1 column
   - 768px (tablet) → 2 columns
   - 1024px (desktop) → 3 columns

**Verify:**
- ✅ Grid responsive
- ✅ No overflow
- ✅ Cards readable on all sizes

---

### Test 8: Account Settings
**Expected:** Form saves and shows toast

**Steps:**
1. Go to `/driver/settings`
2. Click "Account" in sidebar
3. Change name to "John Doe"
4. Click "Save Changes"

**Verify:**
- ✅ Toast: "Account updated successfully"
- ✅ Data persists in form
- ✅ Sidebar changes highlight

---

### Test 9: Notification Toggles
**Expected:** Toggles save with toast

**Steps:**
1. Go to `/driver/settings`
2. Click "Notifications"
3. Toggle any switch (e.g., "Booking Updates")
4. Observe toast

**Verify:**
- ✅ Toast appears
- ✅ Toggle state persists
- ✅ UI updates instantly

---

### Test 10: Download Data
**Expected:** JSON file downloads

**Steps:**
1. Go to `/driver/settings`
2. Click "Privacy"
3. Click "Download Data"

**Verify:**
- ✅ JSON file downloads
- ✅ Filename: `my-parking-data-YYYY-MM-DD.json`
- ✅ Contains user data + settings

---

### Test 11: Delete Account
**Expected:** Requires typed confirmation

**Steps:**
1. Go to `/driver/settings` → "Privacy"
2. Click "Delete Account"
3. Modal appears
4. Try clicking "Delete" without typing
5. Type "DELETE MY ACCOUNT"
6. Click "Delete Permanently"

**Verify:**
- ✅ Button disabled until text typed
- ✅ Exact text required
- ✅ Account deleted on confirm
- ✅ Redirects to home page

---

### Test 12: Host Settings - Payout
**Expected:** Bank details form works

**Steps:**
1. Go to `/host/settings`
2. Click "Payout" in sidebar
3. Fill form:
   - Account Holder: "Rajesh Kumar"
   - Bank: "HDFC Bank"
   - Account: "1234567890"
   - IFSC: "HDFC0001234"
4. Click "Save Payout Account"

**Verify:**
- ✅ Toast: "Payout account updated"
- ✅ Form data persists
- ✅ Bank fields validated

---

### Test 13: Host Settings - Pricing
**Expected:** Pricing form saves

**Steps:**
1. Go to `/host/settings` → "Pricing"
2. Change rates:
   - Hourly: 100
   - Daily: 600
   - Monthly: 9000
3. Click "Save Pricing"

**Verify:**
- ✅ Toast: "Pricing updated"
- ✅ Values persist
- ✅ Numbers validated

---

### Test 14: Mobile Navigation - Settings Sidebar
**Expected:** Sidebar visible on mobile

**Steps:**
1. Resize to 375px (mobile)
2. Go to `/driver/settings`
3. Observe sidebar

**Verify:**
- ✅ Sidebar visible/scrollable
- ✅ Active section highlighted
- ✅ Clicking sections works
- ✅ Content scrolls properly

---

### Test 15: Empty State
**Expected:** Empty state shows with CTA

**Steps:**
1. Go to `/driver/vehicles`
2. You should see "No vehicles yet"
3. Click "Add Your First Vehicle"

**Verify:**
- ✅ Empty state UI displays
- ✅ Emoji illustration visible
- ✅ CTA button works
- ✅ Modal opens on click

---

## 🔍 Edge Cases to Test

### Validation Edge Cases:
- ❌ Submit form with empty fields
- ❌ Try invalid email format
- ❌ Try number-only plate
- ❌ Try special characters in name

### Data Persistence:
- 🔄 Add vehicle → Refresh → Check it exists
- 🔄 Change settings → Close tab → Reopen
- 🔄 Add multiple vehicles → Refresh → Count them

### UI Edge Cases:
- 📱 Very long vehicle name → See truncation
- 📱 100+ character text in form
- 📱 Rapid clicking of buttons
- 📱 Typing rapidly in plate field

---

## 🐛 Debugging Tips

### Check localStorage:
```javascript
// In browser console:
localStorage.getItem('mp_vehicles')
JSON.parse(localStorage.getItem('mp_vehicles'))
```

### Clear All Data:
```javascript
// In browser console:
localStorage.clear()
location.reload()
```

### Check Redux/Zustand State:
```javascript
// In browser console:
useAppStore.getState()
useAppStore.getState().vehicles
```

### Network Requests:
- Open DevTools → Network tab
- All should be local (no API calls in demo)

### Console Errors:
- Open DevTools → Console
- Should see 0 errors
- Should see only warnings (if any)

---

## 📊 Performance Testing

### Bundle Size:
```bash
npm run build
# Check: dist/ folder size
# JS: ~1,050 kB
# CSS: ~45 kB
```

### Build Time:
```bash
npm run build
# Should complete in <1 second
```

### Dev Server:
```bash
npm run dev
# Page load: <1 second
# No console errors
```

---

## ✅ Final Checklist

- [ ] All pages load without errors
- [ ] Vehicle CRUD works
- [ ] Indian plate validation works
- [ ] Settings save with toast
- [ ] Data persists on refresh
- [ ] Responsive on mobile/tablet/desktop
- [ ] No console errors
- [ ] No broken images
- [ ] Animations smooth
- [ ] Forms validate
- [ ] Sidebar navigation works
- [ ] Empty state displays
- [ ] Delete confirmations work
- [ ] Toast notifications appear
- [ ] localStorage persists data

---

## 📞 Troubleshooting

### Page shows blank?
- Check browser console (F12 → Console)
- Check network tab for 404s
- Try hard refresh: Ctrl+F5

### Vehicle not saving?
- Check localStorage in console
- Check if login worked
- Try adding again

### Styling looks wrong?
- Check if CSS loaded (DevTools → Network)
- Try Ctrl+Shift+R (hard refresh)
- Check breakpoints responsive design

### Toast doesn't appear?
- Check if action completed
- Look for console errors
- Verify Zustand store updated

---

**Happy Testing! 🚀**
