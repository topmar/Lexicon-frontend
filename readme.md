# Dog Lovers - Favorithundar Applikation

## 1. Introduktion till applikationen

**Kort beskrivning av applikationen**:
Denna applikation låter användare upptäcka och spara sina favorit hundar från olika raser. Genom att använda ett externt API kan användaren söka efter hundraser, visa detaljerade information om varje hund och spara sina favoriter för framtida referens.

**Tema**:
Applikationen fokuserar på hundar och deras raser, där användare kan söka och spara hundbilder och information som favorit. Användare får även detaljerad information om varje ras, såsom vikt, höjd och temperament.

**API-val**:
Jag valde att använda [Dog API](https://api.thedogapi.com), ett gratis API som erbjuder ett utbud av information om hundraser och bilder. API:et gav mig lättillgängliga endpoints för att hämta hundbilder samt information om rasernas egenskaper. Valet grundades på enkelheten i integrationen och det stora antalet bilder och information som API:et erbjuder.

## 2. Översikt av funktionaliteten

**CRUD-operationer**:
- **Create**: Användaren kan lägga till hundar i sina favoriter genom att klicka på "Lägg till favorit"-knappen.
- **Read**: Hundinformation visas för användaren efter att de har sökt efter en hundras, inklusive bild, vikt, höjd och temperament.
- **Delete**: Användaren kan ta bort hundar från sin favoriter-lista genom att klicka på "Ta bort från favoriter"-knappen.

**API-integration**:
Applikationen gör API-anrop till Dog API för att hämta hundbilder och rasinformation. Resultaten visas dynamiskt för användaren, och varje hundras kan även ses i detalj när användaren klickar på en knapp.

## 3. Felhantering och användarfeedback

**Felmeddelanden**:
Om ett API-anrop misslyckas (t.ex. på grund av nätverksproblem eller otillgängligt API) kommer användaren att få ett felmeddelande som informerar om att något gick fel. Felmeddelanden visas också om användaren försöker ta bort en hund som inte finns i listan eller om data inte kan laddas.

**Formulärvalidering**:
Applikationen kräver ingen direkt användarinmatning (t.ex. registrering eller inloggning), så det finns ingen specifik formulärvalidering. All användarinmatning sker genom klick på knappar.

**Eventuella undantag**:
Om en bild inte kan laddas, till exempel om länken är felaktig, kommer ett felmeddelande att visas för användaren och applikationen kommer inte krascha.

## 4. Användargränssnitt och design

**UI-design**:
Designen är enkel och användarvänlig med ett fokus på att visa bilder på hundarna. Den innehåller en lista över favorit-hundarna och en knapp för att söka efter fler hundraser.

**Estetik**:
För att göra applikationen visuellt tilltalande har jag använt en enkel men funktionell design. Jag använde egna CSS-regler för att säkerställa att bilderna är centrala och knapparna är intuitiva. Det finns också en enkel dialogruta för att visa detaljer om varje hund.

## 5. Kodstruktur och kvalitet

**Struktur**:
Koden är uppdelad i flera moduler t.ex.:
- `api_service.js`: Innehåller alla funktioner för att kommunicera med Dog API.
- `main.js`: Huvudfilen där all logik för interaktionen med användaren och API-integration finns.

**Kommentarer**:
Koden är kommenterad för att förklara de viktigaste delarna och göra det lättare att förstå funktionaliteten. Jag har också använt tydliga variabelnamn för att öka läsbarheten.

**Användning av avancerade tekniker**:
Applikationen använder `async/await` för att hantera asynkrona API-anrop och `Promise`-baserade funktioner för att hantera bildladdningar, vilket gör koden renare och mer hanterbar.

## 6. Utmaningar och lösningar

**Största utmaningar**:
En av de största utmaningarna var att hantera bilderna från Dog API och se till att de laddades ordentligt innan de visades för användaren. Jag var också tvungen att säkerställa att data från API:et och Local Storage synkroniserades korrekt.

**Lösningar**:
Jag löste bildladdningsproblemen genom att använda `Promise` och `onload`-händelser för att kontrollera om bilderna laddades korrekt.

