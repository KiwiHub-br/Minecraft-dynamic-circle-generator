/* 
------------------------------------------------------------
                          CREDITS
  
  Programme créer de zéro par @briec repl.it 
  (dernière mise à jour : 11/08/2020)
  (last update : 08-11-2020)

  Chaîne youtube (KiwiHub) : 
  https://www.youtube.com/channel/UCMCACsSUCFLLH13q9T5enTA
------------------------------------------------------------
*/


//déclaration des variables à utiliser tout au long du programme
var sliderT = document.getElementById("RangeT");
var sliderF = document.getElementById("RangeF");
var sliderOPgrid = document.getElementById("RangeOPgrid");
var sliderZoom = document.getElementById("RangeZoom");
var sliderBase = document.getElementById("RangeBase");
var outputT = document.getElementById("Valeur_T"); 
var outputF = document.getElementById("Valeur_F"); 
var outputOPgrid = document.getElementById("Valeur_OPgrid"); 
var outputZoom = document.getElementById("Valeur_Zoom");
var outputBase = document.getElementById("Valeur_base");
var elmt_fol = document.getElementById("follower");


//déclaration canvas
var canvas  = document.querySelector('#canvas');
var context = canvas.getContext('2d');
var zoomctx = document.getElementById('zoom').getContext('2d');

//fonction pour dessiner un pixel de taille 5
function dessin_setPixel(x,y){
	var taille_pixel = 5;
	context.fillStyle = "rgba(49, 174, 31, 1)";
	context.fillRect(x*taille_pixel, y*taille_pixel, taille_pixel, taille_pixel);
}

//fonction pour le tracé du quadrillage
function quadrillage(r,opacite){
	var grid_size = 10*r+5;

    for (var x = 0; x <= grid_size; x += 5) {
        context.moveTo(0.5 + x, 0);
        context.lineTo(0.5 + x, grid_size);
    }

    for (var y = 0; y <= grid_size; y += 5) {
        context.moveTo(0, 0.5 + y);
        context.lineTo(grid_size, 0.5 + y);
    }
    context.strokeStyle = "rgba(0, 0, 0, "+opacite+")";
    context.stroke();
}

//fonction pour le tracé de la figure géométrique 
function figure_geo(r,forme,base){
	var test_can = document.getElementById('canvas');

   	var taille_box = 10*r+5;

    test_can.setAttribute('width', taille_box); 
    test_can.setAttribute('height', taille_box); 


    var centre_x = r, centre_y = r,x = 0;    
    //r: rayon du cercle , centre_x et centre_y : coordonnées du cercle.
    var m = 5-r*4;

    while(x<=r)
    {
        dessin_setPixel(x - (-centre_x), r - (-centre_y));
        dessin_setPixel(r - (-centre_x), x - (-centre_y));
        dessin_setPixel(centre_x - x, r - (-centre_y));
        dessin_setPixel(centre_x - r, x - (-centre_y));
        dessin_setPixel(x - (-centre_x), centre_y - r);
        dessin_setPixel(r - (-centre_x), centre_y - x);
        dessin_setPixel(centre_x - x, centre_y - r);
        dessin_setPixel(centre_x - r, centre_y - x);

        if (m>0)
        {
            r-=1;
            m-=forme*r; 
            //forme : est la variable pour modifier la forme de la figure, par défaut la forme sera initialisée à 8 pour l'affichage d'un cercle parfait.
        }
        x+=1;
        m+=8*x+(-base*(r/10));
    }
}

//fonction pour réinitialiser le canvas zoom
function clear(){
    zoomctx.clearRect(0,0,300,227);
}

//fonction pour activer ou désactiver la netteté du canvas
var smoothbtn = document.getElementById('smoothbtn');
var net_actif = function(event) {
    zoomctx.imageSmoothingEnabled = !this.checked;
    zoomctx.mozImageSmoothingEnabled = !this.checked;
    zoomctx.webkitImageSmoothingEnabled = !this.checked;
    zoomctx.msImageSmoothingEnabled = !this.checked;
};
smoothbtn.addEventListener('change', net_actif);


//fonction zoom
var zoom = function(event){
    var x_zoom = event.layerX;
    var y_zoom = event.layerY;
    var m_zoom = sliderZoom.value*5;
    clear();
    zoomctx.drawImage(canvas,Math.abs(x_zoom),Math.abs(y_zoom),m_zoom,m_zoom,0,0,200, 200);
    elmt_fol.style.width = m_zoom + "px";
    elmt_fol.style.height = m_zoom + "px";
    requestAnimationFrame(zoom());
};
canvas.addEventListener('mousemove', zoom);



//fonction pour utiliser les sliders
function slider_fun(){
      outputT.innerHTML = sliderT.value;
      outputF.innerHTML = sliderF.value;
      outputOPgrid.innerHTML = sliderOPgrid.value;
      outputZoom.innerHTML = sliderZoom.value;
      outputBase.innerHTML = sliderBase.value;
      figure_geo(sliderT.value,sliderF.value,sliderBase.value);
      quadrillage(sliderT.value,sliderOPgrid.value);
}
slider_fun();

//fonction help
function fun_help(){
    alert("Aide (Help)\n--------------------------------------------------------------------------------\n- To draw the perfect circle, set : the base to 0 and the curvature to 8 or use the 'Reset' button. \n- Pour dessiner le cercle parfait, initialisez : la base à 0 et la courbure à 8, ou utilisez le bouton 'Reset'.");
}

function fun_wht(){
    alert("--------------------------------------------------------------------------------\nThis is a dynamic pixelated circles and other shapes generator. It can be useful if you want to make perfect circles for your Minecraft world :D \n\nCeci est un générateur dynamique de cercles pixelisés et d'autres formes. Il peut-être utile si vous voulez faire des cercles parfaits pour votre monde Minecraft :D\n--------------------------------------------------------------------------------");
}
