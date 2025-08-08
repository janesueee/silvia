// 等待DOM完全加载
document.addEventListener('DOMContentLoaded', function() {
    // 初始化页面动画
    initPageAnimations();
    
    // 初始化星星闪烁效果
    initStarsTwinkling();
    
    // 初始化滚动效果
    initScrollEffects();
    
    // 初始化翅膀效果
    initWingsEffect();
});

// 页面动画
function initPageAnimations() {
    // 为每个section添加淡入动画
    const sections = document.querySelectorAll('main section');
    
    // 创建Intersection Observer来检测元素是否在视口中
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    // 观察每个section
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
}

// 星星闪烁效果
function initStarsTwinkling() {
    // 随机生成星星闪烁效果
    const stars = document.querySelectorAll('#stars, #stars2, #stars3');
    
    stars.forEach(starLayer => {
        // 随机调整星星的透明度
        setInterval(() => {
            const randomOpacity = 0.2 + Math.random() * 0.3;
            starLayer.style.opacity = randomOpacity;
        }, 3000 + Math.random() * 2000);
    });
}

// 滚动效果
function initScrollEffects() {
    // 监听滚动事件
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // 视差滚动效果
        document.querySelector('.stars-container').style.transform = `translateY(${scrollPosition * 0.1}px)`;
        
        // 根据滚动位置添加导航栏背景
        const header = document.querySelector('header');
        if (scrollPosition > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// 翅膀效果
function initWingsEffect() {
    const heroImage = document.querySelector('.hero-image');
    const wingsEffect = document.querySelector('.wings-effect');
    
    if (heroImage && wingsEffect) {
        // 鼠标移动时的翅膀光效
        heroImage.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // 根据鼠标位置调整光效位置
            wingsEffect.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%)`;
            wingsEffect.style.opacity = '1';
        });
        
        // 鼠标离开时恢复
        heroImage.addEventListener('mouseleave', function() {
            wingsEffect.style.opacity = '0';
        });
    }
}

// 角色切换效果（为角色档案页准备）
function initCharacterSwitch() {
    const silviaBtn = document.getElementById('silvia-btn');
    const lilithBtn = document.getElementById('lilith-btn');
    const silviaContent = document.getElementById('silvia-content');
    const lilithContent = document.getElementById('lilith-content');
    
    if (silviaBtn && lilithBtn && silviaContent && lilithContent) {
        silviaBtn.addEventListener('click', function() {
            silviaContent.style.display = 'block';
            lilithContent.style.display = 'none';
            silviaBtn.classList.add('active');
            lilithBtn.classList.remove('active');
        });
        
        lilithBtn.addEventListener('click', function() {
            silviaContent.style.display = 'none';
            lilithContent.style.display = 'block';
            lilithBtn.classList.add('active');
            silviaBtn.classList.remove('active');
        });
    }
}

// 语录滑动效果（为语录页准备）
function initQuotesSlider() {
    const quotes = document.querySelectorAll('.quote-slide');
    const prevBtn = document.querySelector('.prev-quote');
    const nextBtn = document.querySelector('.next-quote');
    let currentQuote = 0;
    
    if (quotes.length && prevBtn && nextBtn) {
        // 隐藏所有语录，只显示当前的
        function showQuote(index) {
            quotes.forEach((quote, i) => {
                if (i === index) {
                    quote.classList.add('active');
                } else {
                    quote.classList.remove('active');
                }
            });
        }
        
        // 初始显示第一条语录
        showQuote(currentQuote);
        
        // 上一条语录
        prevBtn.addEventListener('click', function() {
            currentQuote = (currentQuote - 1 + quotes.length) % quotes.length;
            showQuote(currentQuote);
        });
        
        // 下一条语录
        nextBtn.addEventListener('click', function() {
            currentQuote = (currentQuote + 1) % quotes.length;
            showQuote(currentQuote);
        });
    }
}

// 章节展开效果（为故事章节页准备）
function initChapterExpand() {
    const chapterTitles = document.querySelectorAll('.chapter-title');
    
    if (chapterTitles.length) {
        chapterTitles.forEach(title => {
            title.addEventListener('click', function() {
                const content = this.nextElementSibling;
                
                // 切换展开/折叠状态
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                    this.classList.remove('expanded');
                } else {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    this.classList.add('expanded');
                }
            });
        });
    }
}

// 图集展示效果（为图集页准备）
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    
    if (galleryItems.length && lightbox && lightboxImg && closeBtn) {
        // 点击图片打开灯箱
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const imgSrc = this.querySelector('img').getAttribute('src');
                const caption = this.querySelector('.gallery-caption').textContent;
                
                lightboxImg.setAttribute('src', imgSrc);
                lightboxCaption.textContent = caption;
                lightbox.style.display = 'flex';
                
                // 添加动画效果
                setTimeout(() => {
                    lightbox.style.opacity = '1';
                }, 10);
            });
        });
        
        // 关闭灯箱
        closeBtn.addEventListener('click', function() {
            lightbox.style.opacity = '0';
            setTimeout(() => {
                lightbox.style.display = 'none';
            }, 300);
        });
        
        // 点击灯箱背景也关闭
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeBtn.click();
            }
        });
    }
}
