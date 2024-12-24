const directory = document.getElementById('directory');
const articleContainer = document.getElementById('article');
const sidebar = document.getElementById('sidebar'); // 获取 sidebar 元素
const modeToggle = document.getElementById('mode-toggle');
const sunIcon = document.getElementById('sun-icon');

// 加载文章
function loadArticle(articlePath) {
    fetch(articlePath)
        .then(response => response.text())
        .then(text => {
            articleContainer.innerHTML = marked(text);
        });
}

// 创建目录
function createDirectory(articles) {
    articles.forEach(article => {
        const li = document.createElement('li');
        li.textContent = article.title;
        li.addEventListener('click', () => loadArticle(article.path));
        
        // 添加分组功能
        if (article.subarticles) {
            const subUl = document.createElement('ul');
            subUl.classList.add('subdirectory');
            article.subarticles.forEach(subarticle => {
                const subLi = document.createElement('li');
                subLi.textContent = subarticle.title;
                subLi.addEventListener('click', (e) => {
                    e.stopPropagation(); // 防止触发父级点击事件
                    loadArticle(subarticle.path);
                });
                subUl.appendChild(subLi);
            });
            li.appendChild(subUl);
            li.style.cursor = 'pointer';
            li.addEventListener('click', () => {
                subUl.classList.toggle('hidden');
            });
        }
        
        directory.appendChild(li);
    });
}

// 切换日夜间模式
modeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark'); // 切换 body 的类
    sidebar.classList.toggle('dark'); // 切换 sidebar 的类
    sunIcon.textContent = document.body.classList.contains('dark') ? '🌙' : '☀️';
});

// 加载文章列表
fetch('articles.json')
    .then(response => response.json())
    .then(data => {
        createDirectory(data.articles);
        // 默认加载第一篇文章
        if (data.articles.length > 0) {
            loadArticle(data.articles[0].path);
        }
    });
