const siteConfig = {
    title: "文档导航",
    mdFiles: [
        {
            path: 'docs/announcement.md',
            type: 'announcement',
            tags: ['公告']
        },
        {
            path: 'docs/Stata代码专家.md',
            background: 'https://picsum.photos/800/600',
            tags: ['代码']
        },
        {
            path: 'docs/StackOverflow.md',
            background: 'https://picsum.photos/801/600',
            tags: ['代码']
        }
    ]
};

// 如果使用 CommonJS
if (typeof module !== 'undefined' && module.exports) {
    module.exports = siteConfig;
} else {
    // 如果在浏览器中直接使用
    window.siteConfig = siteConfig;
}
