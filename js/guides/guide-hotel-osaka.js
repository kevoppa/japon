// On s'assure que l'objet existe déjà
window.modalData = window.modalData || {};

// On ajoute le contenu au catalogue
window.modalData['guide-hotel-osaka'] = /* html */ `
        <h3 style="margin-bottom: 15px;">🏨 Hôtel APA Osaka Shin Ekimae</h3>
        <img src="images/osaka/hotel.jpg" alt="Guide Hôtel Osaka" style="max-width:100%;height:auto; border-radius:8px;">
        <p><strong>Nom complet :</strong> APA Hotel & Resort Osaka Shin Ekimae (アパホテル＆リゾート〈大阪新駅前〉)</p>
        <p><strong>Adresse :</strong> 1-10 Nishikawa, Chuo-ku, Osaka 542-0072<br>大阪市中央区西川1-10</p>
        <p><strong>Téléphone :</strong> +81 6-6324-7777</p>
        <p><strong>Réservation :</strong> 5 Adultes - 5 Chambres non-fumeurs - 5 Nuits (13 au 17 avril). Pas de petit déjeuner (non compris).</p>
        
        <div class="btn-group" style="margin-bottom: 15px;">
            <a href="0-fichiers-sensibles/0-LOGEMENTS/2-osaka/booking.pdf" download class="btn">📥 Télécharger le PDF " booking.pdf "</a>
        </div>

        <div class="pdf-container" style="margin-bottom: 20px;">
            <embed src="0-fichiers-sensibles/0-LOGEMENTS/2-osaka/booking.pdf" type="application/pdf" width="100%" height="500px" />
        </div>

        <div class="btn-group" style="margin-bottom: 15px;">
            <a href="0-fichiers-sensibles/0-LOGEMENTS/2-osaka/receipt.pdf" download class="btn">📥 Télécharger le PDF " receipt.pdf "</a>
        </div>

        <div class="pdf-container" style="margin-bottom: 20px;">
            <embed src="0-fichiers-sensibles/0-LOGEMENTS/2-osaka/receipt.pdf" type="application/pdf" width="100%" height="500px" />
        </div>
`;