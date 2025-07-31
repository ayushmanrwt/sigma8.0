console.log('This page is made with love ❤️');

// Add smooth scrolling to all links
const links = document.querySelectorAll('a');
links.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

// Add fade-in animation on scroll
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target); // Stop observing once the animation is triggered
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    observer.observe(section);
});

// Add hover effect to gallery images
const images = document.querySelectorAll('.photos img');
images.forEach(img => {
    img.addEventListener('mouseover', () => {
        img.style.transform = 'scale(1.2)';
        img.style.transition = 'transform 0.3s, box-shadow 0.3s';
        img.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.3)';
    });
    img.addEventListener('mouseout', () => {
        img.style.transform = 'scale(1)';
        img.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    });
});

// Add background video playback control
const videoBackground = document.createElement('video');
videoBackground.src = 'assets/VID-20250712-WA0032.mp4';
videoBackground.autoplay = true;
videoBackground.loop = true;
videoBackground.muted = true;
videoBackground.style.position = 'fixed';
videoBackground.style.top = '0';
videoBackground.style.left = '0';
videoBackground.style.width = '100%';
videoBackground.style.height = '100%';
videoBackground.style.objectFit = 'cover';
videoBackground.style.zIndex = '-1';
videoBackground.style.filter = 'brightness(0.7)';
document.body.prepend(videoBackground);

// Add play/pause functionality for the video
const video = document.getElementById('background-video');
const playPauseButton = document.createElement('button');
playPauseButton.textContent = 'Pause';
playPauseButton.style.position = 'absolute';
playPauseButton.style.top = '20px';
playPauseButton.style.right = '20px';
playPauseButton.style.padding = '10px 20px';
playPauseButton.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
playPauseButton.style.border = 'none';
playPauseButton.style.borderRadius = '5px';
playPauseButton.style.cursor = 'pointer';
playPauseButton.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';

playPauseButton.addEventListener('click', () => {
    if (video.paused) {
        video.play();
        playPauseButton.textContent = 'Pause';
    } else {
        video.pause();
        playPauseButton.textContent = 'Play';
    }
});

document.body.appendChild(playPauseButton);

// Add a dynamic greeting based on the time of day
const greeting = document.createElement('div');
greeting.style.position = 'absolute';
greeting.style.top = '10px';
greeting.style.left = '50%';
greeting.style.transform = 'translateX(-50%)';
greeting.style.padding = '10px 20px';
greeting.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
greeting.style.borderRadius = '10px';
greeting.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
greeting.style.fontSize = '1.2rem';
greeting.style.fontFamily = 'Playfair Display, serif';

greeting.textContent = getGreetingMessage();
document.body.appendChild(greeting);

function getGreetingMessage() {
    const hour = new Date().getHours();
    if (hour < 12) {
        return 'Good Morning, Bunnu!';
    } else if (hour < 18) {
        return 'Good Afternoon, Bunnu!';
    } else {
        return 'Good Evening, Bunnu!';
    }
}

// Use a data structure to manage image data
const imageData = [
    { src: 'assets/photo1.jpg', alt: 'Photo 1' },
    { src: 'assets/photo2.jpg', alt: 'Photo 2' },
    { src: 'assets/photo3.jpg', alt: 'Photo 3' },
    { src: 'assets/photo4.jpg', alt: 'Photo 4' },
    { src: 'assets/IMG-20250710-WA0019.jpg', alt: 'Special Memory 1' },
    { src: 'assets/IMG-20250710-WA0160.jpg', alt: 'Special Memory 2' },
    { src: 'assets/IMG-20250710-WA0166.jpg', alt: 'Special Memory 3' },
    { src: 'assets/IMG-20250710-WA0207.jpg', alt: 'Special Memory 4' },
    { src: 'assets/IMG-20250710-WA0223.jpg', alt: 'Special Memory 5' },
    { src: 'assets/IMG-20250711-WA0001.jpg', alt: 'Special Memory 6' }
];

// Dynamically load images into the gallery
const galleryContainer = document.querySelector('.photos');
imageData.forEach(image => {
    const img = document.createElement('img');
    img.src = image.src;
    img.alt = image.alt;
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
        openImageInModal(image);
    });
    galleryContainer.appendChild(img);
});

// Dynamically load all images from the assets folder into the gallery
const assetsFolder = 'assets';

const assetImages = [
    'IMG-20250710-WA0019.jpg',
    'IMG-20250710-WA0160.jpg',
    'IMG-20250710-WA0166.jpg',
    'IMG-20250710-WA0207.jpg',
    'IMG-20250710-WA0223.jpg',
    'IMG-20250711-WA0001.jpg'
];

// Debugging: Log the gallery container and images being appended
console.log('Gallery container:', galleryContainer);

// Debugging: Check if the gallery container exists and is accessible
if (!galleryContainer) {
    console.error('Gallery container not found in the DOM.');
} else {
    console.log('Gallery container found:', galleryContainer);
}

// Debugging: Check if images are accessible
assetImages.forEach(imageName => {
    const imgPath = `${assetsFolder}/${imageName}`;
    fetch(imgPath)
        .then(response => {
            if (!response.ok) {
                console.error('Image not found or inaccessible:', imgPath);
            } else {
                console.log('Image is accessible:', imgPath);
            }
        })
        .catch(error => {
            console.error('Error fetching image:', imgPath, error);
        });
});

assetImages.forEach(imageName => {
    const img = document.createElement('img');
    img.src = `${assetsFolder}/${imageName}`;
    img.alt = imageName;
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
        openImageInModal({ src: img.src, alt: img.alt });
    });
    galleryContainer.appendChild(img);
    console.log('Appended image:', img.src); // Debugging: Log each appended image
});

// Function to open an image in a modal with preview
function openImageInModal(image) {
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '1000';

    const img = document.createElement('img');
    img.src = image.src;
    img.alt = image.alt;
    img.style.maxWidth = '90%';
    img.style.maxHeight = '90%';
    img.style.borderRadius = '10px';
    img.style.boxShadow = '0 4px 8px rgba(255, 255, 255, 0.5)';

    const caption = document.createElement('p');
    caption.textContent = image.alt;
    caption.style.color = 'white';
    caption.style.marginTop = '10px';
    caption.style.fontSize = '1.2rem';
    caption.style.textAlign = 'center';

    const modalContent = document.createElement('div');
    modalContent.style.textAlign = 'center';
    modalContent.appendChild(img);
    modalContent.appendChild(caption);

    modal.appendChild(modalContent);

    modal.addEventListener('click', () => {
        modal.remove();
    });

    document.body.appendChild(modal);
}

// Hide the 'My Dear Bunnu' banner and show the 'About Sagarika' section after 3 seconds
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const banner = document.querySelector('.banner');
        const aboutSection = document.querySelector('.about');

        if (banner) {
            banner.style.opacity = '0';
            banner.style.transition = 'opacity 1s ease-in-out';
            setTimeout(() => {
                banner.style.display = 'none';
            }, 1000); // Wait for the fade-out animation to complete
        }

        if (aboutSection) {
            aboutSection.style.opacity = '1';
            aboutSection.style.transition = 'opacity 1s ease-in-out';
            aboutSection.style.display = 'block';
        }
    }, 3000); // 3 seconds
});
