(() => {
  const loadComments = async () => {
    if (typeof Gitalk === "undefined") {
      // 还未就绪，等一会再试试吧
      setTimeout(loadComments, 100);
    } else {
      // 准备好了，开始加载
      const container = document.getElementById('gitalk-container');
      if (!container) {
        // 没有容器
        return;
      }
      const path = container.getAttribute("data-path");
      const gitalk = new Gitalk(Object.assign({
          id: path,
          path: path,
      }, {
        clientID: 'Ov23liGnEdBwPWVcjrhX',
        clientSecret: '2b49aecf6954dd58dd7018d417f8a7155105c8b0',
        repo: "dondaha.github.io",
        owner: "dondaha",
        admin: ["dondaha"],
        distractionFreeMode: false,
      }));

      gitalk.render('gitalk-container');
    }
  };

  window.loadComments = loadComments;
  window.addEventListener('pjax:success', () => {
    window.loadComments = loadComments;
  });
})();
