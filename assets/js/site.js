(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.remove('no-js');
  root.classList.add('js');

  function setupNavigation() {
    var toggle = document.querySelector('[data-nav-toggle]');
    var navigation = document.querySelector('[data-site-nav]');

    if (!toggle || !navigation) return;

    function setNavigation(open) {
      toggle.setAttribute('aria-expanded', String(open));
      navigation.classList.toggle('is-open', open);
      var label = toggle.querySelector('.sr-only');
      if (label) label.textContent = open ? 'Close navigation' : 'Open navigation';
    }

    toggle.addEventListener('click', function () {
      setNavigation(toggle.getAttribute('aria-expanded') !== 'true');
    });

    navigation.addEventListener('click', function (event) {
      if (event.target.closest('a')) setNavigation(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setNavigation(false);
        toggle.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) setNavigation(false);
    });
  }

  function setupPublicationFilters() {
    var controls = document.querySelector('[data-publication-filters]');
    if (!controls) return;

    var publications = Array.prototype.slice.call(document.querySelectorAll('[data-publication]'));
    var groups = Array.prototype.slice.call(document.querySelectorAll('[data-publication-group]'));
    var emptyState = document.querySelector('[data-filter-empty]');
    var status = controls.querySelector('[data-filter-status]');
    var activeFilters = { area: 'all', year: 'all' };

    controls.hidden = false;

    function applyFilters() {
      var visibleCount = 0;

      publications.forEach(function (publication) {
        var topics = (publication.getAttribute('data-topics') || '').split(/\s+/);
        var year = publication.getAttribute('data-year');
        var areaMatches = activeFilters.area === 'all' || topics.indexOf(activeFilters.area) !== -1;
        var yearMatches = activeFilters.year === 'all' || year === activeFilters.year;
        var visible = areaMatches && yearMatches;

        publication.hidden = !visible;
        publication.classList.toggle('is-hidden', !visible);
        if (visible) visibleCount += 1;
      });

      groups.forEach(function (group) {
        var hasVisiblePublication = Array.prototype.some.call(
          group.querySelectorAll('[data-publication]'),
          function (publication) { return !publication.hidden; }
        );
        group.hidden = !hasVisiblePublication;
        group.classList.toggle('is-hidden', !hasVisiblePublication);
      });

      if (emptyState) emptyState.hidden = visibleCount !== 0;
      if (status) {
        status.textContent = visibleCount + (visibleCount === 1 ? ' publication shown.' : ' publications shown.');
      }
    }

    controls.addEventListener('click', function (event) {
      var button = event.target.closest('[data-filter-group][data-filter-value]');
      if (!button || !controls.contains(button)) return;

      var group = button.getAttribute('data-filter-group');
      var value = button.getAttribute('data-filter-value');
      if (!Object.prototype.hasOwnProperty.call(activeFilters, group)) return;

      activeFilters[group] = value;
      controls.querySelectorAll('[data-filter-group="' + group + '"]').forEach(function (candidate) {
        var selected = candidate === button;
        candidate.setAttribute('aria-pressed', String(selected));
        candidate.classList.toggle('is-active', selected);
      });

      applyFilters();
    });

    applyFilters();
  }

  function init() {
    setupNavigation();
    setupPublicationFilters();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}());
