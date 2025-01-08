$(document).ready(function() {
    // Функция для генерации звезд
    function generateStars(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars += '★';
            } else {
                stars += '☆';
            }
        }
        return stars;
    }

    // Отправка отзыва
    $('#review-form').on('submit', function(e) {
        e.preventDefault();
        
        var name = $('#name').val();
        var message = $('#message').val();
        var rating = parseInt($('#rating').val());
        
        if (!name || !message || isNaN(rating)) {
            alert('Пожалуйста, заполните все обязательные поля.');
            return;
        }
        
        var reviewDate = new Date().toLocaleDateString('ru-RU');
        
        var newReview = $('<div class="review"><p class="review-rating">' + generateStars(rating) + '</p><p class="review-text">' + message + '</p><p class="review-author">' + name + '</p><p class="review-date">' + reviewDate + '</p></div>');
        
        $('#reviews-list').prepend(newReview);
        
        $('#name').val('');
        $('#message').val('');
        $('#rating').val('5'); // Сбрасываем рейтинг обратно на 5
    });

    // Сортировка отзывов
    $('#sort-select').on('change', function() {
        var sortBy = $(this).val();
        var reviews = $('.review');

        if (sortBy === 'date') {
            reviews.sort(function(a, b) {
                var dateA = new Date($(a).find('.review-date').text()).getTime();
                var dateB = new Date($(b).find('.review-date').text()).getTime();
                return dateB - dateA;
            }).appendTo('#reviews-list');
        } else if (sortBy === 'rating') {
            reviews.sort(function(a, b) {
                var ratingA = $(a).find('.review-rating').text().replace(/[^★]/g, '').length;
                var ratingB = $(b).find('.review-rating').text().replace(/[^★]/g, '').length;
                return ratingB - ratingA;
            }).appendTo('#reviews-list');
        }
    });
    const images = document.querySelectorAll('.hidden-images img');
    let currentIndex = 0;

    // Функция для смены изображения
    function showImage(index, direction) {
        const mainImage = document.querySelector('.main-image img');
        mainImage.style.transform = 'translateX(0)'; // Сбрасываем предыдущую трансформацию

        setTimeout(() => {
            mainImage.src = images[index % images.length].src; // Бесконечная прокрутка
            mainImage.alt = images[index % images.length].alt;
            mainImage.style.transition = 'none'; // Отключаем анимацию на момент замены изображения
            mainImage.offsetWidth; // Хитрость для применения новых стилей до следующей анимации
            mainImage.style.transition = ''; // Включаем анимацию обратно
            mainImage.classList.add(direction); // Применяем нужную анимацию
        }, 200); // Задержка перед показом нового изображения
    }

    // Обработчик для кнопки "Назад"
    document.querySelector('.prev-btn').addEventListener('click', () => {
        currentIndex = (currentIndex + images.length - 1) % images.length; // Бесконечный цикл
        showImage(currentIndex, 'slide-right');
    });

    // Обработчик для кнопки "Вперед"
    document.querySelector('.next-btn').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length; // Бесконечный цикл
        showImage(currentIndex, 'slide-left');
    });
});
