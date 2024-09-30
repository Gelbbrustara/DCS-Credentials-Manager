let credentials = [
    {
        number: "01",
        username: "user01",
        password: "pass01",
        email: "user01@example.com",
        activatedUntil: null,
        cooldownUntil: null
    },
    {
        number: "02",
        username: "user02",
        password: "pass02",
        email: "user02@example.com",
        activatedUntil: null,
        cooldownUntil: null
    },
    {
        number: "03",
        username: "user03",
        password: "pass03",
        email: "user03@example.com",
        activatedUntil: null,
        cooldownUntil: null
    },
    {
        number: "04",
        username: "user04",
        password: "pass04",
        email: "user04@example.com",
        activatedUntil: null,
        cooldownUntil: null
    },
    {
        number: "05",
        username: "user05",
        password: "pass05",
        email: "user05@example.com",
        activatedUntil: null,
        cooldownUntil: null
    },
    {
        number: "06",
        username: "user06",
        password: "pass06",
        email: "user06@example.com",
        activatedUntil: null,
        cooldownUntil: null
    },
    {
        number: "07",
        username: "user07",
        password: "pass07",
        email: "user07@example.com",
        activatedUntil: null,
        cooldownUntil: null
    },
    {
        number: "08",
        username: "user08",
        password: "pass08",
        email: "user08@example.com",
        activatedUntil: null,
        cooldownUntil: null
    },
    {
        number: "09",
        username: "user09",
        password: "pass09",
        email: "user09@example.com",
        activatedUntil: null,
        cooldownUntil: null
    },
    {
        number: "10",
        username: "user10",
        password: "pass10",
        email: "user10@example.com",
        activatedUntil: null,
        cooldownUntil: null
    },
    {
        number: "11",
        username: "user11",
        password: "pass11",
        email: "user11@example.com",
        activatedUntil: null,
        cooldownUntil: null
    },
    {
        number: "12",
        username: "user12",
        password: "pass12",
        email: "user12@example.com",
        activatedUntil: null,
        cooldownUntil: null
    }
];

// Funktion, um aktuelle Zeit und Datum zu erhalten
function getCurrentDateTime() {
    return new Date(); // Lokale Zeit
}

// Aktuelle Zeit und Datum auf der Website anzeigen
function displayCurrentDateTime() {
    const timeElement = document.getElementById("current-time");
    setInterval(() => {
        const now = getCurrentDateTime();
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
        timeElement.innerText = `Aktuelles Datum und Uhrzeit: ${now.toLocaleString('de-DE', options)}`;
    }, 1000); // Aktualisiert jede Sekunde
}

// Popup-Fenster öffnen
function openPopup(index) {
    const popup = document.getElementById("popup");
    const balkenNumber = document.getElementById("popup-balken-number");
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const email = document.getElementById("email");
    const activationStatus = document.getElementById("activation-status");
    const activateButton = document.getElementById("activate-btn");

    const cred = credentials[index - 1];

    balkenNumber.innerText = `Balken ${cred.number}`;
    username.innerText = cred.username;
    password.innerText = cred.password;
    email.innerText = cred.email;

    // Überprüfen, ob der Status aktiviert ist
    if (cred.activatedUntil && new Date(cred.activatedUntil) > new Date()) {
        activationStatus.innerText = `Aktiviert bis: ${new Date(cred.activatedUntil).toLocaleDateString()}`;
        activateButton.style.display = "none"; // Button ausblenden
    } else {
        activationStatus.innerText = ""; // Status zurücksetzen
        activateButton.style.display = "block"; // Button einblenden
    }

    popup.classList.remove("hidden"); // Popup einblenden
    popup.style.display = "block"; // Sicherstellen, dass es sichtbar ist
}

// Popup schließen
function closePopup() {
    const popup = document.getElementById("popup");
    popup.classList.add("hidden");
    popup.style.display = "none"; // Popup ausblenden
}

// Funktion für Kopieren
function copyToClipboard(id) {
    const text = document.getElementById(id).innerText;
    navigator.clipboard.writeText(text).then(() => {
        alert("Kopiert: " + text);
    });
}

// Event Listener für Aktivierung
async function activateCredential() {
    const currentDate = getCurrentDateTime();
    const activationDuration = 14 * 24 * 60 * 60 * 1000;  // 14 Tage
    const cooldownDuration = 6 * 30 * 24 * 60 * 60 * 1000;  // 6 Monate

    const activateUntil = new Date(currentDate.getTime() + activationDuration);
    const cooldownUntil = new Date(activateUntil.getTime() + cooldownDuration);

    const balkenNumber = document.getElementById("popup-balken-number").innerText.split(' ')[1];  // Balken-Nummer extrahieren
    const index = parseInt(balkenNumber) - 1;

    credentials[index].activatedUntil = activateUntil;
    credentials[index].cooldownUntil = cooldownUntil;

    saveCredentials();  // Daten speichern

    document.getElementById("activate-btn").style.display = "none"; // Button ausblenden
    document.getElementById("activation-status").innerText = `Aktiviert bis: ${activateUntil.toLocaleDateString()}`;

    updateStatusOnBars();

    // Cooldown und Aktivierungsstatus zurücksetzen
    setTimeout(() => {
        credentials[index].activatedUntil = null; // Aktivierungsstatus zurücksetzen
        updateStatusOnBars(); // Balken-Status aktualisieren
        setTimeout(() => {
            credentials[index].cooldownUntil = null; // Cooldown zurücksetzen
            saveCredentials(); // Speichern
            updateStatusOnBars(); // Balken-Status aktualisieren
        }, cooldownDuration);
    }, activationDuration);
}

// Aktualisiere aktive Balken
function updateStatusOnBars() {
    const activeBarsContainer = document.getElementById("active-bars");
    activeBarsContainer.innerHTML = '';

    credentials.forEach((cred, index) => {
        const currentDate = new Date();
        if (cred.activatedUntil && new Date(cred.activatedUntil) > currentDate) {
            const div = document.createElement("div");
            div.classList.add("balken");
            div.innerHTML = `Balken ${cred.number} <span style="color: green;">Aktiviert bis: ${new Date(cred.activatedUntil).toLocaleDateString()}</span>`;
            div.addEventListener('click', () => openPopup(index + 1));
            activeBarsContainer.appendChild(div);
        }
    });

    updateAvailableAndUnavailableBars();
}

// Aktualisiere verfügbare und nicht verfügbare Balken
function updateAvailableAndUnavailableBars() {
    const availableDropdown = document.getElementById("available-dropdown");
    const unavailableDropdown = document.getElementById("unavailable-dropdown");

    availableDropdown.innerHTML = '';
    unavailableDropdown.innerHTML = '';

    credentials.forEach((cred, index) => {
        const currentDate = new Date();
        const div = document.createElement("div");
        div.classList.add("balken");

        if (cred.activatedUntil && new Date(cred.activatedUntil) > currentDate) {
            return; // Aktive Balken werden nicht wieder hinzugefügt
        }

        if (cred.cooldownUntil && new Date(cred.cooldownUntil) > currentDate) {
            div.innerHTML = `Balken ${cred.number} <span style="color: red;">Cooldown bis: ${new Date(cred.cooldownUntil).toLocaleDateString()}</span>`;
            unavailableDropdown.appendChild(div);
        } else {
            div.innerHTML = `Balken ${cred.number} <span style="color: yellow;">Nicht aktiv</span>`;
            availableDropdown.appendChild(div);
        }

        div.addEventListener('click', () => openPopup(index + 1));
    });
}

// Dropdown-Menü umschalten
function toggleDropdown(dropdownId) {
    const dropdownContent = document.getElementById(dropdownId);
    dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
}

// Event Listener für "Open"-Buttons zuweisen
document.addEventListener('DOMContentLoaded', () => {
    updateStatusOnBars();
});

// Daten in Local Storage speichern
function saveCredentials() {
    localStorage.setItem('credentials', JSON.stringify(credentials));
}

// Daten aus Local Storage laden
function loadCredentials() {
    const storedCredentials = localStorage.getItem('credentials');
    if (storedCredentials) {
        credentials = JSON.parse(storedCredentials);
        updateStatusOnBars();
    }
}

// Initiales Laden der Website
window.onload = function() {
    loadCredentials();
    displayCurrentDateTime();  // Aktuelle Zeit und Datum anzeigen
};
