# AdSense Debugging Guide

## Erori Comune și Soluții

### 1. "All 'ins' elements already have ads" Error

**Cauza:** React re-renderează componentele în development mode, încercând să inițializeze de mai multe ori aceleași elemente AdSense.

**Soluția implementată:**
- ID-uri unice pentru fiecare element AdSense
- Verificare `data-adsbygoogle-status` înainte de inițializare
- Timer delay pentru stabilizarea DOM-ului
- Suprimarea erorilor duplicate în development

### 2. Reclame care nu se afișează

**Verificări:**
1. Slot-urile AdSense sunt înlocuite cu cele reale din Google AdSense Console
2. Domeniul este adăugat în AdSense Console
3. Site-ul este aprobat pentru AdSense
4. Scriptul AdSense se încarcă corect

### 3. Server Component Event Handler Error

**Eroarea:** "Event handlers cannot be passed to Client Component props"

**Cauza:** Încercarea de a folosi `onLoad` handler într-un Server Component (layout.tsx).

**Soluția:**
```typescript
// ❌ Nu funcționează în Server Components
<Script onLoad={() => {...}} />

// ✅ Folosește Script separat cu inline code
<Script id="adsense-init" strategy="afterInteractive">
  {`
    if (typeof window !== 'undefined' && !window.adsbygoogle) {
      window.adsbygoogle = [];
    }
  `}
</Script>
```

### 4. Development vs Production

**Development:**
- Reclamele pot să nu se afișeze
- Erorile de duplicate sunt normale
- Folosește placeholder slots

**Production:**
- Înlocuiește slot-urile cu cele reale
- Reclamele se vor afișa după aprobare
- Monitorizează performance-ul

## Configurare AdSense Console

1. **Creează Unit-urile de Reclame:**
   ```
   AdSenseNavigation: Slot pentru banner horizontal
   AdSenseBanner: Slot pentru banner după tool
   AdSenseInArticle: Slot pentru reclame în articol
   AdSenseSidebar: Slot pentru reclame mici
   ```

2. **Înlocuiește Slot-urile în Cod:**
   ```typescript
   // În components/AdSense.tsx
   adSlot="1234567890" // Înlocuiește cu slot real
   ```

3. **Testează pe Domeniul Live:**
   - AdSense funcționează doar pe domenii aprobate
   - Testează în incognito pentru a evita cache-ul

## Monitorizare Performance

- CTR (Click-Through Rate): 1-3% este normal
- CPC (Cost Per Click): $0.20-$3.00 pentru developer tools
- Viewability: >50% pentru performanță bună

## Optimizări

1. **Plasare strategică** (implementată):
   - Sub hero: vizibilitate mare
   - După tool: engagement ridicat
   - În conținut: citire activă

2. **Responsive design** (implementată):
   - `data-full-width-responsive="true"`
   - Adaptare automată pentru mobile

3. **Performance**:
   - Lazy loading pentru reclame off-screen
   - Optimizare Core Web Vitals
