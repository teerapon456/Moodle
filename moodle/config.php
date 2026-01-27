<?php
// Moodle configuration file
// Copy this file to moodle/html/config.php

unset($CFG);
global $CFG;
$CFG = new stdClass();

//=========================================================================
// 1. DATABASE SETUP
//=========================================================================
$CFG->dbtype    = 'mariadb';
$CFG->dblibrary = 'native';
$CFG->dbhost    = 'mysql';
$CFG->dbname    = 'moodle';
$CFG->dbuser    = 'moodle';
$CFG->dbpass    = 'moodle_password';
$CFG->prefix    = 'mdl_';

$CFG->dboptions = array(
    'dbpersist' => 0,
    'dbport' => 3306,
    'dbsocket' => '',
    'dbcollation' => 'utf8mb4_unicode_ci',
);

//=========================================================================
// 2. WEB SITE LOCATION
//=========================================================================
$CFG->wwwroot   = 'http://localhost:8080';
$CFG->dataroot  = '/var/www/moodledata';
$CFG->admin     = 'admin';

//=========================================================================
// 3. DIRECTORY PERMISSIONS
//=========================================================================
$CFG->directorypermissions = 0777;

//=========================================================================
// 4. SESSION HANDLING
//=========================================================================
$CFG->session_handler_class = '\core\session\file';
$CFG->session_file_save_path = '/var/www/moodledata/sessions';

//=========================================================================
// 5. WEB SERVICES (for Next.js frontend)
//=========================================================================
// Enable after installation via Site Administration > Advanced Features
// $CFG->enablewebservices = true;

//=========================================================================
// 6. DEBUG MODE (uncomment for development)
//=========================================================================
// $CFG->debug = (E_ALL | E_STRICT);
// $CFG->debugdisplay = 1;

//=========================================================================
// BOOTSTRAP MOODLE
//=========================================================================
require_once(__DIR__ . '/lib/setup.php');
