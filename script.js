// 1. GESTION DU THÈME (Mémoire + Synchronisation)
function toggleTheme() {
    const body = document.body;
    const isDark = body.getAttribute('data-theme') === 'dark';
    
    if (isDark) {
        body.removeAttribute('data-theme');
        updateThemeButtons("🌙 Mode Nuit");
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        updateThemeButtons("☀️ Mode Jour");
        localStorage.setItem('theme', 'dark');
    }
}

function updateThemeButtons(text) {
    const mainBtn = document.getElementById('theme-btn');
    if (mainBtn) {
        if (window.innerWidth <= 600) {
            // On prend l'émoji (le premier élément avant l'espace)
            mainBtn.innerHTML = text.split(' ')[0]; 
        } else {
            mainBtn.innerHTML = text;
        }
    }
}

// 2. CHARGEMENT INITIAL (Vérifie la mémoire au démarrage)
(function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        // On attend que le HTML soit chargé pour mettre à jour le texte des boutons
        window.addEventListener('DOMContentLoaded', () => {
            updateThemeButtons("☀️ Mode Jour");
        });
    }
})();

// DONNEES DE TOUS LES GUIDES DETAILLÉS
const modalData = {
    'guide-bus': `
        <h3 style="margin-bottom: 15px;">🚌 Guide Bus Haneda → APA Hotel Makuhari</h3>
        
        <div class="btn-group" style="margin-bottom: 15px;">
            <a href="documents/lieu-bus.pdf" download class="btn">📥 Télécharger le PDF</a>
        </div>

        <div class="pdf-container">
            <embed src="documents/lieu-bus.pdf" type="application/pdf" width="100%" height="500px" />
        </div>

        <p><strong>Lieu :</strong> Terminal 3 (T3), Hall des Arrivées (2F).</p>
        <p>1. Suivez les panneaux orange "Airport Bus".</p>
        <p>2. Aux bornes (Fr/En) : Destination <strong>Chiba Area → Kaihin-Makuhari Area</strong>.</p>
        <p>3. Arrêt exact : <strong>APA HOTEL & RESORT TOKYO BAY MAKUHARI</strong>.</p>
        <p>「アパホテル＆リゾート［千葉］」</p>
        <p>4. Coût : ~7500 ¥ (40,64 euros) pour 5 adultes.</p>

        <p><em>Mémo Japonais : 「アパホテル＆リゾート〈東京ベイ幕張〉まで大人5名お願いしたいです。」</em></p>
        <p><em>(Je souhaite réserver un transport pour 5 adultes jusqu'à l'hôtel APA Hotel & Resort Tokyo Bay Makuhari.)</em></p>
        <p><strong>Durée :</strong> Environ 40-50 minutes selon le trafic.</p>

        <div style="background: rgba(217, 83, 79, 0.15); border-left: 4px solid #d9534f; padding: 12px; margin-top: 15px; border-radius: 4px;">
            <p style="margin: 0;"><strong>🧳 Bagages :</strong> Descendez au niveau 1F. Donnez vos billets, gardez précieusement les 5 reçus bagages ! L'arrêt final est juste devant la Central Tower de l'hôtel.</p>
        </div>
    `,
    'guide-bus-pdf': `
        <h3>🚌 Guide Officiel : Haneda → Shinjuku / Makuhari</h3>
        <p>Ce guide détaille l'achat des billets aux automates et l'emplacement des comptoirs au Hall des Arrivées.</p>
        
        <div class="btn-group" style="margin-bottom: 15px;">
            <a href="documents/guide-bus.pdf" download class="btn">📥 Télécharger le PDF</a>
        </div>

        <div class="pdf-container">
            <embed src="documents/guide-bus.pdf" type="application/pdf" width="100%" height="500px" />
        </div>

        <hr>
        <h4>Rappel des étapes clés :</h4>
        <ul>
            <li>Cherchez les comptoirs orange "Airport Limousine" dans le Hall des Arrivées (2F).</li>
            <li>Utilisez les bornes automatiques multilingues pour sélectionner votre destination.</li>
            <li>Le quai d'embarquement est indiqué sur votre billet (souvent au niveau 1F).</li>
        </ul>
    `,
    'guide-wifi': `
        <h3>📶 Récupération Pocket WiFi (Sakura Mobile)</h3>
        <img src="images/le-guide-wifi.jpg" alt="Guide WiFi" style="max-width:100%;height:auto; border-radius:8px;">
        <p><strong>Emplacement :</strong> Aéroport Haneda Terminal 3, Hall des arrivées (2F).</p>
        <p><strong>Où exactement :</strong> À l'extrême droite après avoir quitté les douanes. Cherchez le comptoir JAL ABC.</p>
        <p><strong>Horaires :</strong> 24h/24 et 7j/7 (fermé juste entre 1h00 et 4h00 du matin).</p>
        <p><strong>Retour :</strong> Pas besoin de le rendre ! Jetez la carte SIM après utilisation.</p>
    `,
    'guide-bus-alternative': `
        <h3 style="margin-bottom: 15px;">📱 Guide Bus Alternative (Option Tardive)</h3>
        <p>Si vous manquez le bus direct pour l'hôtel, prenez la ligne vers <strong>Makuhari Baytown</strong>.</p>
        
        <table style="width:100%; border-collapse: collapse; margin-top: 10px; font-size: 0.9em; border: 1px solid rgba(128,128,128,0.3);">
            <thead>
                <tr style="background: rgba(128, 128, 128, 0.15); text-align: left;">
                    <th style="padding: 10px; border: 1px solid rgba(128,128,128,0.3);">Compagnie</th>
                    <th style="padding: 10px; border: 1px solid rgba(128,128,128,0.3);">Départ T3</th>
                    <th style="padding: 10px; border: 1px solid rgba(128,128,128,0.3);">Arrivée</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="padding: 10px; border: 1px solid rgba(128,128,128,0.3);">Keihin Kyuko</td>
                    <td style="padding: 10px; border: 1px solid rgba(128,128,128,0.3);">21h50</td>
                    <td style="padding: 10px; border: 1px solid rgba(128,128,128,0.3);">22h46</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid rgba(128,128,128,0.3);">Limousine Bus</td>
                    <td style="padding: 10px; border: 1px solid rgba(128,128,128,0.3);">22h10</td>
                    <td style="padding: 10px; border: 1px solid rgba(128,128,128,0.3);">23h06</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid rgba(128,128,128,0.3);">Keihin Kyuko</td>
                    <td style="padding: 10px; border: 1px solid rgba(128,128,128,0.3);">22h40</td>
                    <td style="padding: 10px; border: 1px solid rgba(128,128,128,0.3);">23h36</td>
                </tr>
                <tr style="color: #d4a017; font-weight: bold; background: rgba(212, 160, 23, 0.1);">
                    <td style="padding: 10px; border: 1px solid rgba(128,128,128,0.3);">Limousine Bus</td>
                    <td style="padding: 10px; border: 1px solid rgba(128,128,128,0.3);">23h05</td>
                    <td style="padding: 10px; border: 1px solid rgba(128,128,128,0.3);">00h01</td>
                </tr>
            </tbody>
        </table>

        <div style="margin-top: 20px; padding: 15px; background: rgba(255, 193, 7, 0.1); border: 1px solid #d4a017; border-radius: 8px;">
            <p style="margin: 0 0 8px 0; color: #d4a017; font-weight: bold;">🚶 Fin de trajet à pied (20 min / 1.4 km) :</p>
            <p style="margin: 0;">Descendre à l'arrêt : <strong>ファーストウイング (First Wing)</strong>.</p>
            <p style="margin: 5px 0;">Marcher vers l'hôtel : <strong>Makuhari Prince Hotel (APA)</strong>.</p>
            <p style="margin: 0; font-size: 0.8em; opacity: 0.7;">📍 〒261-0021 Chiba, Mihama Ward, Hibino, 2-3</p>
        </div>
    `,
    'guide-car-tokyo1': `
        <h3>🚗 Location Toyota Tokyo (07 au 12 Avril)</h3>
        <p><strong>Agence :</strong> Kaihinmakuhari Sta. North Ext. Shop</p>
        <p><strong>Adresse :</strong> Koendori, Bldg. 1F 1-6-2 hibino, Mihama-ku, Chiba 261-0021<br>千葉市美浜区ひび野1-6-2公園通りビル1F</p>
        <p><strong>Téléphone :</strong> 043-296-8000</p>
        <p><strong>Dates :</strong> Du 07/04 à 10:00 au 12/04 à 20:00.</p>
        <p><strong>Véhicule :</strong> Classe C2 Corolla. Prix total : 74,800 JPY.</p>
        <p><em>Notes : À 10-15 min à pied de l'hôtel APA.</em></p>
    `,
    'guide-resto1': `
        <h3>🍴 Dîner Seafood Buffet Ginza</h3>
        <p><strong>Lieu :</strong> Ginza Nine Building No. 3, 8-10 Ginza, Chuo-ku, Tokyo B1F</p>
        <p><strong>Réservation :</strong> LAO Kevin (0760127109) - 5 Personnes.</p>
        <p><strong>Date & Heure :</strong> Mercredi 8 avril 2026 à 18h00.</p>
        <p><strong>Menu :</strong> Premium grillé sur table (120 min). Bœuf Wagyu noir et oursin de mer au homard + Buffet 150 sortes + Boissons à volonté.</p>
        <p><strong>Prix :</strong> 18 000 Yens par personne. Table en salle semi-privée.</p>
    `,
    'guide-car-osaka': `
        <h3>🚗 Location Toyota Osaka (13 au 17 Avril)</h3>
        <p><strong>Agence :</strong> Shin Osaka Shinkansen Exit Shop</p>
        <p><strong>Adresse :</strong> Shinosaka Hairodo Bldg. 1F 1-2-9 Miyahara, Yodogawa-ku, Osaka<br>大阪市淀川区宮原1-2-9 新大阪ハイロードビル1F</p>
        <p><strong>Téléphone :</strong> 06-6393-0100</p>
        <p><strong>Dates :</strong> Du 13/04 à 12:00 au 17/04 à 21:00.</p>
        <p><strong>Véhicule :</strong> Classe C2 Corolla. Prix total : 63,250 JPY.</p>
    `,
    'guide-transfer-itm': `
        <h3>🚐 Transfert Hôtel Osaka → Aéroport ITM</h3>
        <p><strong>Prise en charge :</strong> Samedi 18 Avril à 05h00.</p>
        <p><strong>Lieu :</strong> APA Hotel Shin-Osaka Ekimae.</p>
        <p><strong>Destination :</strong> Osaka Itami International Airport (ITM).</p>
        <p><strong>Véhicule :</strong> Minibus (Service SmartRyde) - Max 5 personnes.</p>
        <p><strong>Prix :</strong> 108.39 EUR payé.</p>
    `,
    'guide-car-oki': `
        <h3>🚗 Location Voiture Okinawa (Kanucha)</h3>
        <p><strong>Agence :</strong> Bureau Accueil de l'Aéroport (Kanucha Rent-a-Car)</p>
        <p><strong>Adresse :</strong> 439 Kagamizu, ville de Naha, Okinawa 9010142</p>
        <p><strong>Téléphone :</strong> 098-995-9977 (Mail: rentacar@kanucha.jp)</p>
        <p><strong>Dates :</strong> Du 18/04 à 10:00 au 23/04 à 10:00.</p>
        <p><strong>Véhicule :</strong> Classe WA (8 places : Toyota Noah / Mitsubishi Delica) pour gérer les 5 grandes valises.</p>
        <p><em>Lien de réservation : https://reserve.rentacar-samurai.jp/kanucharentacar</em></p>
    `,
    'guide-villa': `
        <h3>🏠 Villa Onna Luxury (Okinawa)</h3>
        <p><strong>Adresse :</strong> 字仲泊1411番地100, 恩納村, 沖縄県 904-0415</p>
        <p><strong>Hôte :</strong> Yota</p>
        <p><strong>Contact d'urgence (Appel Vidéo) :</strong><br>
        - WhatsApp : +81-80-8053-5529<br>
        - Line ID : yotaokinawa ou mikaOkinawa</p>
        <p><strong>Check-in :</strong> Après 15h00. <strong>Check-out :</strong> Avant 11h00.</p>
        <p><em>Utilisez LINE pour des conseils vidéo si la maison est difficile à trouver.</em></p>
    `,
    'guide-hotel-tokyo2': `
        <h3>🏨 Hôtel Toyoko Inn Asakusa (Retour Tokyo)</h3>
        <p><strong>Nom complet :</strong> Toyoko Inn Tokyo Asakusa Kuramae No.2 (東横INN浅草蔵前2)</p>
        <p><strong>Adresse :</strong> Taito-ku Kuramae 2-7-5, Tokyo 111-0051<br>台東区蔵前2-7-5</p>
        <p><strong>Téléphone :</strong> +81 3 6899 2045</p>
        <p><strong>Réservation :</strong> 5 Adultes - 3 Nuits (23 au 26 avril) - 5 Chambres non-fumeurs.</p>
        <p>Petit déjeuner compris.</p>
    `,
    'guide-car-tokyo2': `
        <h3>🚗 Location Toyota Tokyo Asakusabashi (Shopping)</h3>
        <p><strong>Agence :</strong> Asakusabashi Shop</p>
        <p><strong>Adresse :</strong> 5-22-5 Asakusabashi, Taito-ku, Tokyo 111-0053<br>台東区浅草橋5-22-5</p>
        <p><strong>Téléphone :</strong> 03-5821-6324</p>
        <p><strong>Dates :</strong> Du 24/04 à 09:00 au 25/04 à 20:00 (TRÈS IMPORTANT DE RESPECTER 20H).</p>
        <p><strong>Véhicule :</strong> Classe C3 PRIUS 2.0. Prix total : 44,000 JPY.</p>
    `,
    'guide-transfer-hnd': `
        <h3>🚐 2x Transferts Hôtel → Haneda</h3>
        <p><strong>Date et heure :</strong> Dimanche 26 Avril à 05h30.</p>
        <p><strong>Départ :</strong> Toyoko Inn Tokyo Asakusa Kuramae No.2.</p>
        <p><strong>Arrivée :</strong> Haneda Airport Terminal 3 Station.</p>
        <p><strong>Réservation 1 :</strong> Large People Carrier (Carzen+).</p>
        <p><strong>Réservation 2 :</strong> Large People Carrier (New World Japan Co. Ltd) ID: 748321480.</p>
        <p><em>Chauffeurs attendront max 15 minutes.</em></p>
    `,
    'guide-hotel-paris': `
        <h3>🏨 Hôtel Première Classe (Paris CDG) & Navettes</h3>
        <p><strong>Adresse :</strong> Rue Du Stade Sauvanet, 77990 Le Mesnil-Amelot</p>
        <p><strong>Téléphone :</strong> +33 1 60 27 10 74</p>
        <p><strong>Navette Aller (26/04) :</strong> Aéroport CDG vers Hôtel à 21h00.</p>
        <p><strong>Hôtel :</strong> 1 grand lit double (Check-out le 27/04 avant 11h). Petit déjeuner compris.</p>
        <p><strong>Navette Retour (27/04) :</strong> Hôtel vers Aéroport CDG à 09h15.</p>
    `
};

// FONCTIONS POUR OUVRIR / FERMER LES MODALS
const overlay = document.getElementById('modal-overlay');
const modalBox = document.getElementById('modal-box');
const contentArea = document.getElementById('modal-content-area');

function openModal(id) {
    const contentArea = document.getElementById('modal-content-area');
    const titleArea = document.getElementById('modal-title-placeholder');
    
    if (modalData[id]) {
        // On crée un élément temporaire pour extraire le titre h3
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = modalData[id];
        const titleElement = tempDiv.querySelector('h3');
        
        // Si un h3 existe, on le déplace dans la zone de titre, sinon on vide
        if (titleElement) {
            titleArea.innerHTML = `<h3>${titleElement.innerHTML}</h3>`;
            titleElement.remove(); // On l'enlève du corps pour pas qu'il soit en double
        } else {
            titleArea.innerHTML = "";
        }

        contentArea.innerHTML = tempDiv.innerHTML;
        document.getElementById('modal-overlay').style.display = 'block';
        document.getElementById('modal-box').style.display = 'block';
    }
}
function closeModal() {
    document.getElementById('modal-overlay').style.display = 'none';
    document.getElementById('modal-box').style.display = 'none';
}

// Automatisation des images
document.addEventListener("DOMContentLoaded", function() {
    const images = document.querySelectorAll('.card-img');
    images.forEach(img => {
        if (!img.getAttribute('src') || img.getAttribute('src') === "") {
            img.remove();
        }
        img.onerror = function() {
            this.src = "documents/photo-par-defaut.jpg";
            this.onerror = null;
        };
    });
});