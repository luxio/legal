The Legal module for DrupalGap.

## Setup

### 1. Install companion module in Drupal

Download and enable the **DrupalGap Legal** module on your Drupal website:

https://www.drupal.org/project/drupalgap_legal

```
drush dl drupalgap_legal
drush en drupalgap_legal
```

### 2. Patch the Legal module in Drupal

The Legal module in Drupal breaks the Services module's User Login Resource. Here are some quick terminal commands to apply the patch to fix this:

```
cd sites/all/modules/legal
wget https://www.drupal.org/files/issues/legal-add_exception_path_configuration-2167987-4.patch
patch -p1 < legal-add_exception_path_configuration-2167987-4.patch
```

More information available with this Drupal issue: https://www.drupal.org/node/2167987

### 3. Configure module

In Drupal, go to `admin/config/people/legal/settings` and enter this in the **Login path exceptions** field:

```
drupalgap/user/login.json
```

Note, when enabling the DrupalGap Legal module in step number 1, this step may have been automatically completed during the enabling of the module.

### 4. Enable the Legal module in DrupalGap

Open `settings.js` and enable the module as usual:

```
Drupal.modules.contrib['legal'] = {};
```
