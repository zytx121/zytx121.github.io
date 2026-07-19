---
permalink: /
title: "Yue Zhou"
excerpt: "Yue Zhou is an Associate Professor at East China Normal University working on UAV-based spatial intelligence, vision-language models, adversarial attack, and remote sensing image understanding."
page_key: home
author_profile: true
redirect_from:
  - /about/
  - /about.html
---

<header class="hero" aria-labelledby="home-title">
  <p class="eyebrow">Associate Professor · DREAMS Lab · East China Normal University</p>
  <h1 id="home-title">Yue Zhou <span lang="zh-CN">周越</span></h1>
  <p class="hero__lede">I study spatial intelligence for aerial and remote-sensing systems, with a focus on vision-language models, UAV-based agents, adversarial robustness, and oriented object detection.</p>
  <div class="hero__actions">
    <a class="button button--primary" href="{{ '/publications/' | relative_url }}">Explore publications</a>
    <a class="button button--secondary" href="mailto:{{ site.author.email }}">Get in touch</a>
  </div>
</header>

<section class="content-section research-profile" aria-labelledby="research-profile-title">
  <div class="section-heading">
    <p class="section-kicker">Research profile</p>
    <h2 id="research-profile-title">Connecting aerial perception with language and action</h2>
  </div>
  <div class="prose-wide">
    <p>Yue Zhou is an Associate Professor in the DREAMS Lab at East China Normal University. Previously, he was a Research Fellow at <a href="https://www.ntu.edu.sg/s-lab" target="_blank" rel="noopener noreferrer">S-Lab, Nanyang Technological University</a>, where he focused on remote-sensing vision-language models and UAV-based agents.</p>
    <p>He received his Ph.D. from Shanghai Jiao Tong University under the supervision of <a href="https://icisee.sjtu.edu.cn/jiaoshiml/jiangxue.html" target="_blank" rel="noopener noreferrer">Professor Xue Jiang</a>. He works closely with <a href="https://mc-lan.github.io/" target="_blank" rel="noopener noreferrer">Mengcheng Lan</a> on multimodal referring-expression segmentation and with <a href="https://yangxue0827.github.io/" target="_blank" rel="noopener noreferrer">Xue Yang</a> on rotated object detection and SAR ship detection.</p>
  </div>
</section>

<section class="content-section" aria-labelledby="interests-title">
  <div class="section-heading">
    <p class="section-kicker">Research interests</p>
    <h2 id="interests-title">Current directions</h2>
  </div>
  <div class="interest-grid">
    <article class="interest-card">
      <h3>UAV Spatial Intelligence</h3>
      <p>Spatially aware aerial agents for fine-grained perception, reasoning, grounding, and retrieval.</p>
    </article>
    <article class="interest-card">
      <h3>Vision-Language Models</h3>
      <p>Multimodal models and benchmarks for visual grounding, segmentation, and mathematical reasoning in remote sensing.</p>
    </article>
    <article class="interest-card">
      <h3>Adversarial Robustness</h3>
      <p>Adversarial attacks and robust visual interpretation for optical aerial imagery.</p>
    </article>
    <article class="interest-card">
      <h3>Oriented Object Detection</h3>
      <p>Algorithms, datasets, and open-source toolboxes for rotated objects and SAR ship detection.</p>
    </article>
  </div>
</section>

<aside class="recruitment-card" aria-labelledby="recruitment-title">
  <p class="recruitment-card__label">Open positions</p>
  <h2 id="recruitment-title">Students and interns are welcome</h2>
  <p>We are looking for self-motivated students and interns who want to do impactful work on UAV-based spatial intelligence, vision-language models, adversarial attack, and remote-sensing image understanding. Please feel free to contact me by email.</p>
  <p lang="zh-CN">欢迎自驱力较强的学生和实习生加入，一起在无人机空间智能、多模态模型、对抗攻击与遥感影像解译等方向开展有影响力的研究。请随时通过电子邮件与我联系。</p>
  <a class="button button--recruitment" href="mailto:{{ site.author.email }}">{{ site.author.email }}</a>
</aside>

<section class="content-section" aria-labelledby="selected-publications-title">
  <div class="section-heading section-heading--with-action">
    <div>
      <p class="section-kicker">Selected work</p>
      <h2 id="selected-publications-title">Featured publications</h2>
    </div>
    <a class="section-link" href="{{ '/publications/' | relative_url }}">View all publications</a>
  </div>
  {% assign featured_publications = site.data.publications | where: 'featured', true | sort: 'year' | reverse %}
  <div class="publication-grid">
    {% for publication in featured_publications limit: 6 %}
      {% include publication-card.html publication=publication %}
    {% endfor %}
  </div>
</section>

<section class="content-section" aria-labelledby="news-title">
  <div class="section-heading">
    <p class="section-kicker">Updates</p>
    <h2 id="news-title">Latest news</h2>
  </div>
  <ol class="news-timeline news-list">
    {% for news in site.data.news limit: 6 %}
      {% include news-item.html news=news %}
    {% endfor %}
  </ol>

  {% assign news_count = site.data.news | size %}
  {% if news_count > 6 %}
    <details class="news-archive">
      <summary>Earlier news ({{ news_count | minus: 6 }})</summary>
      <ol class="news-timeline news-list news-list--archive">
        {% for news in site.data.news offset: 6 %}
          {% include news-item.html news=news %}
        {% endfor %}
      </ol>
    </details>
  {% endif %}
</section>

<section class="content-section" aria-labelledby="opensource-title">
  <div class="section-heading">
    <p class="section-kicker">Open source</p>
    <h2 id="opensource-title">Projects and community contributions</h2>
  </div>
  <div class="project-grid">
    <article class="project-card">
      <h3><a href="https://github.com/open-mmlab/mmrotate" target="_blank" rel="noopener noreferrer">MMRotate</a></h3>
      <p>A unified rotated-object detection toolbox and benchmark. Yue led its initial release and has led its development since 2022.</p>
    </article>
    <article class="project-card">
      <h3><a href="https://github.com/yangxue0827/RotationDetection" target="_blank" rel="noopener noreferrer">AlphaRotate</a></h3>
      <p>A TensorFlow benchmark and toolkit for rotation detection.</p>
    </article>
    <article class="project-card">
      <h3><a href="https://github.com/Jittor/JDet" target="_blank" rel="noopener noreferrer">JDet</a></h3>
      <p>An open-source object-detection toolbox built with Jittor.</p>
    </article>
    <article class="project-card">
      <h3><a href="https://github.com/open-mmlab/mmdetection" target="_blank" rel="noopener noreferrer">MMDetection</a></h3>
      <p>An OpenMMLab object-detection toolbox to which Yue has contributed.</p>
    </article>
  </div>
</section>

<section class="content-section contact-section" aria-labelledby="contact-title">
  <div class="section-heading">
    <p class="section-kicker">Contact</p>
    <h2 id="contact-title">Let’s discuss research and collaboration</h2>
  </div>
  <p>Email <a href="mailto:{{ site.author.email }}">{{ site.author.email }}</a>, or find publication records on <a href="{{ site.author.googlescholar }}" target="_blank" rel="noopener noreferrer">Google Scholar</a>.</p>
</section>
