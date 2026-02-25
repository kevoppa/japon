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
    
    // On applique le thème immédiatement pour éviter le flash blanc
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
    } else {
        document.body.removeAttribute('data-theme');
    }

    // On attend que le DOM soit prêt pour régler l'aspect du bouton
    window.addEventListener('DOMContentLoaded', () => {
        if (savedTheme === 'dark') {
            updateThemeButtons("☀️ Mode Jour");
        } else {
            // Par défaut ou si 'light', on propose de passer en nuit
            updateThemeButtons("🌙 Mode Nuit");
        }
    });
})();

// DONNEES DE TOUS LES GUIDES DETAILLÉS
const modalData = {
    'guide-osaka': `
        <h3 style="margin-bottom: 15px;">🏯 Osaka : La Cité Électrique et Gourmande</h3>
        
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 20px;">
            <img src="images/osaka/chateau.jpg" alt="Chateau Osaka" style="grid-column: span 2; grid-row: span 2; width: 100%; height: 250px; object-fit: cover; border-radius: 8px;">
            <img src="images/osaka/shinsekai.jpg" alt="Shinsekai" style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px;">
            <img src="images/osaka/umeda.jpg" alt="Umeda Sky" style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px;">
            <img src="images/osaka/kuromon.jpg" alt="Marché Kuromon" style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px;">
            <img src="images/osaka/solaniwa.jpg" alt="Solaniwa Onsen" style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px;">
            <img src="images/osaka/solaniwa2.jpg" alt="Solaniwa Onsen" style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px;">
        </div>

        <p><strong>L'ambiance :</strong> Plus décontractée que Tokyo, Osaka est la ville de la fête et du "manger jusqu'à l'épuisement".</p>

        <h4>📍 Vos Incontournables (Améliorés)</h4>
        <ul>
            <li><strong>Château d'Osaka :</strong> Un monument puissant. <em>Pépite :</em> Ne faites pas forcément la queue pour l'intérieur (très moderne), profitez plutôt du parc et des remparts qui sont impressionnants.</li>
            <li><strong>Shinsekai Market :</strong> Le quartier "rétro". <em>Pépite :</em> C'est ici qu'il faut manger des <strong>Kushikatsu</strong> (brochettes frites). L'ambiance semble figée dans les années 70.</li>
            <li><strong>Umeda Sky Building :</strong> Pour la vue. <em>Pépite :</em> Allez-y juste avant le coucher du soleil pour voir la ville s'allumer. L'escalier mécanique "dans le vide" est incroyable.</li>
            <li><strong>Kuromon Ichiba :</strong> Le paradis des produits de la mer. Goûtez au crabe grillé ou au bœuf de Kobe sur le pouce.</li>
        </ul>

        <h4>♨️ Détente Finale : Solaniwa Onsen</h4>
        <p>C'est plus qu'un bain thermal, c'est un parc à thème. Vous pouvez porter un Yukata traditionnel, vous promener dans un jardin sur le toit et profiter de massages. C'est le lieu parfait pour reposer vos jambes après Kyoto.</p>

        <div style="background: rgba(49, 130, 206, 0.1); border-left: 4px solid var(--accent-blue); padding: 12px; margin-top: 15px; border-radius: 4px; font-size: 0.9em;">
            <p style="margin: 0;"><strong>💡 Le secret shopping :</strong> Le <strong>Don Quijote</strong> de Dotonbori a une grande roue sur sa façade ! C'est le meilleur endroit pour les souvenirs bizarres et pas chers (Kit-Kat au thé vert, gadgets).</p>
        </div>
    `,
    'guide-kyoto': `
        <h3 style="margin-bottom: 15px;">⛩️ Immersion dans le Vieux Kyoto</h3>
        
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 20px;">
            <img src="images/kyoto/fushimi.jpg" alt="Fushimi Inari" style="grid-column: span 2; grid-row: span 2; width: 100%; height: 250px; object-fit: cover; border-radius: 8px;">
            <img src="images/kyoto/kiyomizu.jpg" alt="Kiyomizu-dera" style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px;">
            <img src="images/kyoto/gion.jpg" alt="Gion" style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px;">
            <img src="images/kyoto/kinkakuji.jpg" alt="Kinkakuji" style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px;">
            <img src="images/kyoto/nishiki.jpg" alt="Marché Nishiki" style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px;">
            <img src="images/kyoto/Hanamikoji.jpg" alt="Hanamikoji" style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px;">
        </div>

        <p><strong>L'essentiel :</strong> Kyoto est une ville de marche. Prévoyez de bonnes chaussures pour explorer les ruelles pavées.</p>

        <h4>📍 Vos Incontournables (Améliorés)</h4>
        <ul>
            <li><strong>Fushimi Inari :</strong> Les milliers de portes rouges. <em>Pépite :</em> Ne faites pas tout le mont, montez jusqu'à l'intersection "Yotsutsuji" pour la vue sur la ville, puis redescendez.</li>
            <li><strong>Kiyomizu-dera & Sannenzaka :</strong> Le temple suspendu. <em>Pépite :</em> Allez-y tôt (8h30) pour descendre Sannenzaka sans la foule, c'est là que Kyoto est la plus belle.</li>
            <li><strong>Marché Nishiki :</strong> "La cuisine de Kyoto". Idéal pour déjeuner sur le pouce (poulpes miniatures, mochis frais).</li>
            <li><strong>Le Pavillon d'Or (Kinkaku-ji) :</strong> Il brille littéralement. <em>Pépite :</em> Juste à côté, visitez le jardin de pierre du <strong>Ryoan-ji</strong> pour un moment de calme absolu.</li>
        </ul>

        <h4>🌸 Le soir à Gion</h4>
        <p>Promenez-vous dans la rue <strong>Hanamikoji</strong>. Si vous avez de la chance, vous apercevrez une Geiko (Geisha) se rendant à un rendez-vous. Pour le dîner, longez la rivière <strong>Pontocho</strong>, une ruelle étroite pleine de charme.</p>

        <div style="background: rgba(212, 160, 23, 0.15); border: 1px solid #d4a017; padding: 12px; margin-top: 15px; border-radius: 8px; font-size: 0.9em;">
            <p style="margin: 0;"><strong>💡 Conseil Photo :</strong> Près du Tofukuji, ne ratez pas le pont couvert Tsutenkyo, surtout si la végétation est dense, c'est un tableau vivant.</p>
        </div>
    `,
    'guide-dotonbori': `
        <h3 style="margin-bottom: 15px;">🍤 Guide Soirée : L'Effervescence de Dotonbori</h3>
        
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 20px;">
            <img src="images/dotonbori/glico-man.jpg" alt="Glico Man" 
                 style="grid-column: span 2; grid-row: span 2; width: 100%; height: 250px; object-fit: cover; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
            
            <img src="images/dotonbori/takoyaki.jpg" alt="Takoyaki" 
                 style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px;">
            
            <img src="images/dotonbori/canal-nuit.webp" alt="Canal de Dotonbori" 
                 style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px;">

            <img src="images/dotonbori/crabe-geant.jpg" alt="Kani Doraku" 
                 style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px;">
            
            <img src="images/dotonbori/okonomiyaki.jpg" alt="Okonomiyaki" 
                 style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px;">

            <img src="images/dotonbori/Kushikatsu.jpg" alt="Okonomiyaki" 
                 style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px;">
        </div>

        <p><strong>Soirée à Osaka :</strong> Bienvenue dans la cuisine du Japon ! Dotonbori est célèbre pour ses enseignes lumineuses géantes et sa nourriture de rue incroyable.</p>

        <div style="background: rgba(49, 130, 206, 0.1); border-left: 4px solid var(--accent-blue); padding: 12px; margin: 15px 0; border-radius: 4px;">
            <p style="margin: 0;">✨ <strong>L'ambiance :</strong> Le quartier est à son apogée à la tombée de la nuit. C'est bruyant, coloré, et ça sent divinement bon à chaque coin de rue.</p>
        </div>

        <h4>📍 Les Étapes Incontournables</h4>
        <ul>
            <li><strong>Le Pont Ebisu :</strong> C'est le centre du quartier. De là, vous verrez l'emblématique panneau <strong>Glico Man</strong>. C'est LE spot pour votre photo souvenir.</li>
            <li><strong>La Chasse aux Enseignes :</strong> Amusez-vous à trouver le crabe géant qui bouge ses pinces (Kani Doraku), le poulpe géant et le dragon.</li>
            <li><strong>Balade au bord du canal :</strong> Descendez les escaliers pour marcher le long de l'eau. C'est un peu plus calme et magnifique avec les reflets des néons.</li>
        </ul>

        <h4>😋 Spécialités Locales (À ne pas rater !)</h4>
        <ul>
            <li><strong>Takoyaki :</strong> Ces boulettes de poulpe fondantes. Attention, c'est souvent très brûlant à l'intérieur !</li>
            <li><strong>Okonomiyaki :</strong> La célèbre "crêpe/omelette" japonaise. Osaka est la capitale mondiale de ce plat.</li>
            <li><strong>Kushikatsu :</strong> Des brochettes frites (légumes, viande, fromage). Un régal croustillant.</li>
        </ul>

        <div style="background: rgba(212, 160, 23, 0.15); border: 1px solid #d4a017; padding: 12px; margin-top: 15px; border-radius: 8px; font-size: 0.9em;">
            <p style="margin: 0;"><strong>💡 Conseils "Kuidaore" (Manger jusqu'à l'excès) :</strong><br>
            • <strong>Précision :</strong> La plupart des stands de street food n'acceptent que les <strong>espèces</strong>. Prévoyez de la monnaie.<br>
            • <strong>Astuce :</strong> Évitez les restaurants avec de trop longues files sur l'artère principale, les petites ruelles parallèles cachent souvent des pépites bien meilleures !</p>
        </div>
    `,
    'guide-ligne-keiyo': `
        <h3 style="margin-bottom: 15px;">🚄 Guide : De Kaihimmakuhari au Shinkansen (Vers Osaka)</h3>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 20px;">
            <img src="images/trajet/gare-kaihin.jpg" alt="Gare Kaihimmakuhari" style="grid-column: span 2; width: 100%; height: 180px; object-fit: cover; border-radius: 8px;">
            <img src="images/trajet/ligne-keiyo.jpg" alt="Ligne Keiyo Rouge" style="width: 100%; height: 180px; object-fit: cover; border-radius: 8px;">
            <img src="images/trajet/panneau-shinkansen.jpg" alt="Panneau Shinkansen" style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px;">
            <img src="images/trajet/shinkansen-train.webp" alt="Train Shinkansen" style="grid-column: span 2; width: 100%; height: 120px; object-fit: cover; border-radius: 8px;">
        </div>

        <p><strong>Étape 1 : Le départ (08h30 - 09h00)</strong></p>
        <ul>
            <li><strong>Marcher :</strong> Sortez de l'hôtel et marchez tout droit vers la <strong>Gare de Kaihimmakuhari</strong> (800m).</li>
            <li><strong>Entrer :</strong> Passez les portillons avec votre carte Suica/Pasmo.</li>
            <li><strong>Le Quai :</strong> Suivez la couleur <strong>ROUGE</strong>. Montez sur le quai de la <strong>Ligne Keiyō</strong> direction "Tokyo".</li>
            <li><strong>Le Train :</strong> Prenez de préférence le "Rapid" (Rouge foncé). Il met 30 min.</li>
        </ul>

        <div style="background: rgba(229, 62, 62, 0.1); border-left: 4px solid #e53e3e; padding: 12px; margin: 15px 0; border-radius: 4px;">
            <p style="margin: 0;">⚠️ <strong>Attention Arrivée Tokyo :</strong> La ligne Keiyō arrive TRÈS loin des autres trains à Tokyo Station (elle est en sous-sol profond). Prévoyez 15 min de marche <u>à l'intérieur</u> de la gare.</p>
        </div>

        <h4>📍 Étape 2 : La traversée de la Gare de Tokyo (Le Fil d'Ariane)</h4>
        <p>Une fois descendus du train rouge à Tokyo :</p>
        <ol>
            <li><strong>Monter :</strong> Prenez les escaliers mécaniques vers le haut (suivez "Exit / All Lines").</li>
            <li><strong>Le Tapis Roulant :</strong> Vous allez traverser de très longs couloirs avec des tapis roulants. <strong>Restez sur le tapis !</strong></li>
            <li><strong>Suivre le BLEU :</strong> Cherchez les panneaux avec un logo de train à grande vitesse et l'inscription <strong>"Tokaido-Sanyo Shinkansen"</strong> (couleur bleue).</li>
            <li><strong>Le Portillon Spécial :</strong> Vous arriverez devant des portillons dédiés au Shinkansen. Insérez votre ticket de Shinkansen (ou scannez votre QR code).</li>
        </ol>

        <h4>🚄 Étape 3 : Embarquement pour Osaka (~12h00)</h4>
        <ul>
            <li><strong>Le Quai :</strong> Regardez les grands écrans. Cherchez votre numéro de train (ex: <em>Nozomi 225</em>). Le numéro du quai (Track) sera affiché (souvent quai 14 à 19).</li>
            <li><strong>Le Wagon :</strong> Sur le quai, regardez au sol : les numéros de voitures (Car 1, Car 2...) sont marqués. Allez devant le vôtre.</li>
            <li><strong>Le Voyage :</strong> Installez-vous, le train part à la seconde près. Destination <strong>Shin-Osaka</strong> en 2h30.</li>
        </ul>

        <div style="background: rgba(212, 160, 23, 0.15); border: 1px solid #d4a017; padding: 12px; margin-top: 15px; border-radius: 8px; font-size: 0.9em;">
            <p style="margin: 0;"><strong>💡 Astuces :</strong><br>
            • Ne sortez JAMAIS de la gare (ne passez pas les portillons de sortie vers la ville).<br>
            • Cherchez toujours le panneau <strong>BLEU</strong> avec le dessin du train pointu.<br>
            • Si vous êtes perdu, montrez votre ticket à n'importe quel agent en disant "Shinkansen ?".<br>
            • Achetez votre "Ekiben" (boîte repas) sur le quai du Shinkansen avant de monter !<br>
            • Pensez à acheter de l'eau avant de monter, le Shinkansen donne soif !</p>
        </div>
    `,
    'guide-chinatown': `
        <h3 style="margin-bottom: 15px;">🏮 Immersion à Chinatown Yokohama (Chukagai)</h3>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 20px;">
            <img src="images/chinatown/temple.jpg" alt="Temple Kanteibyo" 
                 style="grid-column: span 2; grid-row: span 2; width: 100%; height: 250px; object-fit: cover; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
            
            <img src="images/chinatown/restaurant-chinois.jpg" alt="Rues de Chinatown" 
                 style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px;">
            
            <img src="images/chinatown/boulettes.webp" alt="Xiaolongbao" 
                 style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px;">

            <img src="images/chinatown/canard.jpg" alt="Canard laqué" 
                 style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px;">
            
            <img src="images/chinatown/restaurant-manchinro.jpg" alt="Restaurant Manchiro" 
                 style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px; grid-column: span 1;">

            <img src="images/chinatown/quartier.jpg" alt="Restaurant Manchiro" 
                 style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px; grid-column: span 1;">
        </div>
        <p><strong>Dimanche 12/04/2026 :</strong> Une matinée vibrante de couleurs, d'odeurs et de saveurs dans le plus grand quartier chinois du Japon.</p>

        <div style="background: rgba(49, 130, 206, 0.1); border-left: 4px solid var(--accent-blue); padding: 12px; margin: 15px 0; border-radius: 4px;">
            <p style="margin: 0;">🚶 <strong>Ambiance :</strong> Le dimanche, le quartier s'anime dès 10h. C'est le moment idéal pour voir les rues s'éveiller sous les lanternes rouges et les portes monumentales (Paifang).</p>
        </div>

        <h4>📍 Points Forts de la Matinée</h4>
        <ul>
            <li><strong>Portes Monumentales :</strong> Entrez par la porte <em>Zenrin-mon</em>. Le quartier en compte dix, chacune sculptée avec des détails fascinants pour attirer la chance et repousser les mauvais esprits.</li>
            <li><strong>Temple Kanteibyo :</strong> Un joyau aux couleurs éclatantes (or et rouge) dédié au dieu de la prospérité. L'architecture est époustouflante et l'odeur d'encens vous transporte immédiatement ailleurs.</li>
            <li><strong>Street Food & Shopping :</strong> Explorez les ruelles étroites pour dénicher des thés rares, des gadgets uniques ou des souvenirs artisanaux.</li>
        </ul>

        <h4>😋 L'Expérience Culinaire (Incontournable)</h4>
        <ul>
            <li><strong>Le Brunch des Gourmets :</strong> Ne repartez pas sans avoir goûté aux <em>Nikuman</em> (brioches géantes à la viande à la vapeur) ou aux <em>Xiaolongbao</em> (raviolis juteux).</li>
            <li><strong>Déjeuner :</strong> Installez-vous dans l'un des nombreux restaurants pour un canard laqué ou des Dim Sum. C'est ici que l'on trouve la meilleure cuisine sino-japonaise du pays.</li>
        </ul>

        <h4>🌊 Le Petit Plus "Confort"</h4>
        <ul>
            <li><strong>Parc Yamashita (à 5 min à pied) :</strong> Si vous avez besoin d'une pause au calme après l'effervescence de Chinatown, marchez jusqu'au bord de mer pour admirer la vue sur la baie de Yokohama et le célèbre paquebot Hikawa Maru.</li>
        </ul>

        <div style="background: rgba(212, 160, 23, 0.15); border: 1px solid #d4a017; padding: 12px; margin-top: 15px; border-radius: 8px; font-size: 0.9em;">
            <p style="margin: 0;"><strong>💡 Conseil pratique :</strong><br>
            • <strong>Accès :</strong> Depuis Tokyo, prenez la ligne <em>Tokyu Toyoko</em> (directe jusqu'à Motomachi-Chukagai).<br>
            • <strong>Astuce :</strong> Arrivez vers 10h30 pour éviter les files d'attente trop longues dans les restaurants populaires le dimanche midi.</p>
        </div>
    `,
    'guide-fuji': `
        <h3 style="margin-bottom: 15px;">🗻 Le Grand Tour du Mont Fuji (Voiture)</h3>
        
        <p><strong>Planning "De l'Aube à la Nuit" :</strong> Un itinéraire optimisé pour profiter de chaque instant sans fatigue, idéal pour admirer le géant japonais sous toutes ses coutures.</p>

        <div style="background: rgba(49, 130, 206, 0.1); border-left: 4px solid var(--accent-blue); padding: 12px; margin: 15px 0; border-radius: 4px;">
            <p style="margin: 0;">🚗 <strong>Trajet :</strong> Départ 10h00 de Tokyo via la Chuo Expressway. Gardez les yeux ouverts : après 1h de route, la silhouette imposante du volcan surgit soudainement au milieu de l'autoroute.</p>
        </div>

        <h4>📍 Matinée : Panorama Sans Effort & Tradition</h4>
        <ul>
            <li><strong>11h30 : Lac Yamanaka (Panorama Dai-mizaki)</strong> - Oubliez les marches ! Ici, on se gare face au volcan. C'est l'un des points de vue les plus larges et impressionnants, où le Fuji semble à portée de main.</li>
            <li><strong>Balade : Oshino Hakkai</strong> - Flânez entre les huit étangs sacrés aux eaux cristallines d'un bleu profond, alimentés par la fonte des neiges. Un décor de carte postale, tout plat et très reposant.</li>
            <li><strong>Déjeuner :</strong> Goûtez aux <em>Houtou Noodles</em>, ces nouilles larges et fondantes mijotées dans une soupe de potiron. Un délice local beaucoup plus tendre que les Udon classiques.</li>
        </ul>

        <h4>🌊 Après-midi : Sérénité et Puissance Naturelle</h4>
        <ul>
            <li><strong>14h30 : Lac Kawaguchi (Parc Oishi)</strong> - L'instant Zen. Marchez le long des parterres de fleurs qui bordent le lac. C’est le moment idéal pour une glace à la lavande face au reflet parfait du volcan dans l'eau.</li>
            <li><strong>16h30 : Chutes de Shiraito</strong> - Un spectacle sauvage unique. L'eau ne tombe pas d'une rivière, elle jaillit directement de la roche volcanique en centaines de filets de soie. Un lieu pur, frais et puissant.</li>
        </ul>

        <h4>✨ Soirée : Le Grand Final sous les Étoiles</h4>
        <ul>
            <li><strong>17h45 : Lac Tanuki</strong> - Le spot ultime pour le coucher de soleil. Posez-vous sur le ponton en bois et regardez le ciel passer du orange au violet électrique sur les neiges éternelles, dans un calme absolu.</li>
            <li><strong>Dîner à Fujinomiya :</strong> Dégustez les célèbres <em>Fujinomiya Yakisoba</em> au restaurant <em>Uruoitei</em>, une véritable institution où les nouilles sont sautées avec savoir-faire.</li>
            <li><strong>Final : Sanctuaire Fujisan Sengen Taisha</strong> - Terminez la journée par une marche mystique dans ce sanctuaire illuminé de nuit. L'atmosphère y est solennelle et apaisante avant de reprendre la route.</li>
        </ul>

        <div style="background: rgba(212, 160, 23, 0.15); border: 1px solid #d4a017; padding: 12px; margin-top: 15px; border-radius: 8px; font-size: 0.9em;">
            <p style="margin: 0;"><strong>💡 Rappels Voitures :</strong><br>
            • <strong>Péages :</strong> Voies "CASH" (vert) acceptant espèces et cartes si vous n'avez pas de carte ETC voies "ETC" (bleu).<br>
            • <strong>Étoiles :</strong> Avant de quitter le plateau d'Asagiri, stoppez 10 min au parking <em>Michi-no-Eki</em> pour contempler la Voie Lactée au-dessus du volcan.<br>
            • <strong>Retour :</strong> Reprise de la route vers 21h30 via la Shin-Tomei pour une arrivée fluide à Tokyo vers minuit.</p>
        </div>
    `,
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
        <img src="images/toyota/osaka.jpg" alt="Guide Location Voiture Osaka" style="max-width:100%;height:auto; border-radius:8px;">
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