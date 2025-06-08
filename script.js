document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const prevButton = document.querySelector('#prev');
    const nextButton = document.querySelector('#next');
    const loveMessage = document.querySelector('.love-message');
    
    let currentIndex = 0;
    let messageShown = false;
    
    // Предзагруженные фотографии с подписями
    const photos = [
        {
            src: 'img/поезд.jpg',
            caption: 'Наше первое свидание'
        },
        {
            src: 'img/др.jpg',
            caption: 'Прогулка в парке'
        },
        {
            src: 'img/снт1.jpg',
            caption: 'Лучшие моменты вместе'
        },
        {
            src: 'img/нгканикулы.jpg',
            caption: 'Ты делаешь меня счастливым'
        },
        {
            src: 'img/немецкий антикт.jpg',
            caption: 'Навсегда в моем сердце'
        }
    ];
    
    console.log(currentIndex, photos.length);
    // Инициализация карусели
    initCarousel();
    
    // Кнопки навигации
    prevButton.addEventListener('click', showPrevImage);
    nextButton.addEventListener('click', showNextImage);
    
    // Показать сообщение при загрузке
    setTimeout(showLoveMessage, 2000);
    
    function initCarousel() {
        carousel.innerHTML = '';
        
        photos.forEach((photo, index) => {
            const carouselItem = document.createElement('div');
            carouselItem.className = 'carousel-item';
            carouselItem.dataset.index = index;
            
            const imageContainer = document.createElement('div');
            imageContainer.className = 'carousel-image-container';
            
            const img = document.createElement('img');
            img.src = photo.src;
            img.alt = photo.caption;
            img.loading = 'lazy';
            
            const caption = document.createElement('div');
            caption.className = 'caption';
            caption.textContent = photo.caption;
            
            imageContainer.appendChild(img);
            carouselItem.appendChild(imageContainer);
            carouselItem.appendChild(caption);
            carousel.appendChild(carouselItem);
        });
        
        // Устанавливаем первое фото как активное
        updateActiveSlide();
    }
    
    function showPrevImage() {
        if (photos.length > 0) {
            currentIndex = (currentIndex - 1 + photos.length) % photos.length;
            updateActiveSlide();
            checkForMessage();
        }
    }
    
    function showNextImage() {
        if (photos.length > 0) {
            currentIndex = (currentIndex + 1) % photos.length;
            updateActiveSlide();
            checkForMessage();
        }
    }
    
    function updateActiveSlide() {
        const items = document.querySelectorAll('.carousel-item');
        const itemWidth = items[0].offsetWidth;
        
        // Плавная прокрутка к текущему слайду
        carousel.scrollTo({
            left: currentIndex * itemWidth,
            behavior: 'smooth'
        });
        
        // Обновляем классы активности
        items.forEach((item, index) => {
            item.classList.toggle('active', index === currentIndex);
        });
    }
    
    function checkForMessage() {
        if (!messageShown && currentIndex === photos.length - 1) {
            showLoveMessage();
        }
    }
    
    function showLoveMessage() {
        loveMessage.classList.add('visible');
        messageShown = true;
        
        setTimeout(() => {
            loveMessage.classList.remove('visible');
        }, 5000);
    }
});