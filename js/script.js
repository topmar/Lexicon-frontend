function updateImageSource() {
    const img = document.getElementById('header-image');
    const img2 = document.getElementById('sample-photo1');
    const img3 = document.getElementById('sample-photo2');

    if (window.innerWidth <= 768) {
        img.src = "/public/mobile-image1.png";
        img2.src = "/public/mobile-image2.png";
        img3.src = "/public/mobile-image3.png";
    } else {
        img.src = "/public/image1.png";
        img2.src = "/public/image2.png";
        img3.src = "/public/image3.png";
    }
}

function hideOverlay() {
    updateImageSource();
    document.getElementById('overlay').classList.add("hidden");
}

window.addEventListener('load', hideOverlay);
window.addEventListener('resize', updateImageSource);