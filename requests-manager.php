<?php
/*
Plugin Name: Requests Manager
Description: Automatic Requests Manager
Version: 1.0
Author: Salivon Eugene
*/

define( 'RM__PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
add_action("admin_menu", array("RequestManager", "initSettings"));
add_action("admin_init", array("RequestManager", "InitDB"));

wp_register_style('font-awesome', plugins_url( '/css/font-awesome.min.css', __FILE__ ));
wp_enqueue_style( 'font-awesome');

class RequestManager{
    
    function initSettings(){
        add_menu_page("Requests Manager Settings", "Заявки", "manage_options", "requests-manager", array("RequestManager", "requestEditor"));
        add_submenu_page("requests-manager", "Налаштування", "Налаштування", "manage_options", "rm-settings", array("RequestManager", "requestManagerSettings"));
    }

	function InitDB(){
		global $wpdb;
		$tb_name = $wpdb->get_blog_prefix() . 'rm_before_games';
		$charset_collate = "DEFAULT CHARACTER SET {$wpdb->charset} COLLATE {$wpdb->collate}";
		require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
		$sql = "CREATE TABLE IF NOT EXISTS {$tb_name} (
					`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
					`name` VARCHAR(500) NOT NULL,
                    `type` INT
		) {$charset_collate};";
		dbDelta($sql);
        $tb_games = $wpdb->get_blog_prefix() . 'rm_actual_games';
        $createGamesTab = "CREATE TABLE IF NOT EXISTS {$tb_games} (
            `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
            `name` VARCHAR(500) NOT NULL,
            `type` INT
        ) {$charset_collate}";
        dbDelta($createGamesTab);
        $tb_category_age = $wpdb->get_blog_prefix() . 'rm_category_age';
        $createCategoryAgeTab = "CREATE TABLE IF NOT EXISTS {$tb_category_age} (
            `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
            `title` VARCHAR(200) NOT NULL
        ) {$charset_collate}";
        dbDelta($createCategoryAgeTab);
        $tb_category_age = $wpdb->get_blog_prefix() . 'rm_category_weight';
        $createCategoryAgeTab = "CREATE TABLE IF NOT EXISTS {$tb_category_age} (
            `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
            `title_w` VARCHAR(200) NOT NULL,
            `parent` INT
        ) {$charset_collate}";
        dbDelta($createCategoryAgeTab);
        $tb_regions = $wpdb->get_blog_prefix() . 'rm_regions';
        $createRegionsTab = "CREATE TABLE IF NOT EXISTS {$tb_regions} (
            `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            `region` VARCHAR(200) NOT NULL
        ) {$charset_collate}";
        dbDelta($createRegionsTab);
	}

    function includeBootstrap(){
        wp_register_style('rm_bootstrap', plugins_url( '/css/bootstrap.css', __FILE__ ));
        wp_enqueue_style( 'rm_bootstrap');
        wp_register_script( 'bootstrap', plugins_url( '/js/bootstrap.js', __FILE__ ) );
        wp_enqueue_script(  'bootstrap'); 
    }

    function requestEditor(){
        RequestManager::includeBootstrap();
        ?>   
        <div class="container-fluid">
            <h2>Менеджер заявок</h2>
        </div>
        <?php
    }

    function requestManagerSettings(){
        RequestManager::includeBootstrap();      
        ?>
        <div class="container-fluid">
            <h2>Основні налаштування</h2>

            <!-- Nav tabs -->
            <ul class="nav nav-tabs" role="tablist">
                <li role="presentation"><a href="#games" aria-controls="games" role="tab" data-toggle="tab">Змагання</a></li>
                <li role="presentation"><a href="#categories" aria-controls="categories" role="tab" data-toggle="tab">Категорії</a></li>
                <li role="presentation" class="active"><a href="#regions" aria-controls="regions" role="tab" data-toggle="tab">Області</a></li>
            </ul>

            <!-- Tab panes -->
            <div class="tab-content">
                <div role="tabpanel" class="tab-pane" id="games">
                <?php   
                    if(file_exists(RM__PLUGIN_DIR."/templates/games-manager.php")){
                        require_once(RM__PLUGIN_DIR."/templates/games-manager.php");
                    }
                ?>
                </div>
                <div role="tabpanel" class="tab-pane" id="categories">
                <?php   
                    if(file_exists(RM__PLUGIN_DIR."/templates/categories-manager.php")){
                        require_once(RM__PLUGIN_DIR."/templates/categories-manager.php");
                    }
                ?>                
                </div>
                <div role="tabpanel" class="tab-pane active" id="regions">
                <?php 
                    if(file_exists(RM__PLUGIN_DIR."/templates/regions-manager.php")){
                        require_once(RM__PLUGIN_DIR."/templates/regions-manager.php");
                    }
                ?>
                </div>
            </div>

        </div>
        <?php
    }
}
?>