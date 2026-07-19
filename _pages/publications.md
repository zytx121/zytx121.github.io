---
permalink: /publications/
title: "Publications"
excerpt: "Publications by Yue Zhou in vision-language models, adversarial attack, oriented object detection, and SAR recognition."
page_key: publications
author_profile: true
---

<header class="page-header">
  <p class="eyebrow">Research output</p>
  <h1>Publications</h1>
  <p>Work spanning remote-sensing vision-language models, UAV-based spatial intelligence, adversarial attack, oriented object detection, and SAR recognition.</p>
</header>

{% assign sorted_publications = site.data.publications | sort: 'year' | reverse %}
{% assign publication_years = sorted_publications | map: 'year' | uniq %}

<div class="filter-controls filter-bar" data-publication-filters hidden aria-label="Filter publications">
  <fieldset class="filter-group">
    <legend>Research area</legend>
    <div class="filter-group__options">
      <button class="filter-button filter-chip is-active" type="button" data-filter-group="area" data-filter-value="all" aria-pressed="true">All areas</button>
      <button class="filter-button filter-chip" type="button" data-filter-group="area" data-filter-value="vision-language" aria-pressed="false">Vision-Language</button>
      <button class="filter-button filter-chip" type="button" data-filter-group="area" data-filter-value="adversarial-attack" aria-pressed="false">Adversarial Attack</button>
      <button class="filter-button filter-chip" type="button" data-filter-group="area" data-filter-value="rotated-detection" aria-pressed="false">Rotated Detection</button>
      <button class="filter-button filter-chip" type="button" data-filter-group="area" data-filter-value="sar-recognition" aria-pressed="false">SAR Recognition</button>
    </div>
  </fieldset>

  <fieldset class="filter-group">
    <legend>Year</legend>
    <div class="filter-group__options">
      <button class="filter-button filter-chip is-active" type="button" data-filter-group="year" data-filter-value="all" aria-pressed="true">All years</button>
      {% for year in publication_years %}
        <button class="filter-button filter-chip" type="button" data-filter-group="year" data-filter-value="{{ year }}" aria-pressed="false">{{ year }}</button>
      {% endfor %}
    </div>
  </fieldset>

  <p class="filter-status" data-filter-status role="status" aria-live="polite"></p>
</div>

<section class="content-section publication-group" data-publication-group aria-labelledby="featured-work-title">
  <div class="section-heading">
    <p class="section-kicker">Highlights</p>
    <h2 id="featured-work-title">Featured work</h2>
  </div>
  <div class="publication-grid">
    {% for publication in sorted_publications %}
      {% if publication.featured %}
        {% include publication-card.html publication=publication %}
      {% endif %}
    {% endfor %}
  </div>
</section>

<section class="content-section publication-group" data-publication-group aria-labelledby="more-publications-title">
  <div class="section-heading">
    <p class="section-kicker">Complete record</p>
    <h2 id="more-publications-title">More publications</h2>
  </div>
  <div class="publication-list">
    {% for publication in sorted_publications %}
      {% unless publication.featured %}
        {% include publication-item.html publication=publication %}
      {% endunless %}
    {% endfor %}
  </div>
</section>

<p class="empty-state" data-filter-empty hidden>No publications match both selected filters.</p>
