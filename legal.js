/**
 * Postprocess a service call.
 * @param {Object} options
 * @param {Object} result
 */
function legal_services_postprocess(options, result) {
  if (options.service == 'system' && options.resource == 'connect') {
    drupalgap.legal = result.legal;
  }
}

function legal_menu() {
  var items = {};
  items['legal'] = {
    page_callback: 'legal_page',
    title: 'Terms and Conditions',
    access_arguments: ['view Terms and Conditions']
  };
  return items;
}

function legal_form_alter(form, form_state, form_id) {
  if (form_id == 'user_register_form') {
    var weight = 0;
    $.each(form.elements, function(name, element) {
      if (name == 'submit') { return; }
      if (typeof element.weight === 'undefined') {
        form.elements[name].weight = weight;
      }
      weight = form.elements[name].weight + 1;
    });

    var hasExtra = false;
    var legalDisplayed = false;
    var prefix = '<div class="legal">';
    var suffix = '</div>';
    var scrollBox = prefix + '<h4>' + t('Terms and Conditions of Use') + '</h4>' +
        '<textarea disabled>' + drupalgap.legal.legal_conditions.conditions + '</textarea>' +
        suffix;
    var other = prefix  + drupalgap.legal.legal_conditions.conditions + suffix;
    $.each(drupalgap.legal.legal_conditions.extras, function(name, condition) {
      if (condition == '') { return; }
      hasExtra = true;
      form.elements[name] = {
        type: 'checkbox',
        title: t(condition),
        weight: weight,
        required: true
      };
      weight++;
      if (!legalDisplayed && drupalgap.legal.legal_display != '3') {
        legalDisplayed = true;
        switch (drupalgap.legal.legal_display) {
          case '0': // Scroll Box
            form.elements[name].prefix = scrollBox;
            break;
          case '1': // Scroll Box (CSS)
          case '2': // HTML Text
            form.elements[name].prefix = other;
            break;
        }
      }
    });

    form.elements['legal_accept'] = {
      type: 'checkbox',
      title: t('Accept Terms & Conditions of Use'),
      weight: weight + 1,
      required: true
    };

    if (!legalDisplayed) {
      switch (drupalgap.legal.legal_display) {
        case '0': // Scroll Box
          form.elements['accept'].prefix = scrollBox;
          break;
        case '1': // Scroll Box (CSS)
        case '2': // HTML Text
          form.elements['accept'].prefix = other;
          break;
        case '3': // Page Link
          form.elements['accept'].suffix = l(t('Terms & Conditions'), 'legal');
          break;
      }
      legalDisplayed = true;
    }
  }
}

function legal_page() {
  return drupalgap.legal.legal_conditions.conditions;
}
