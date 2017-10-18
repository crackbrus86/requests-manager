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

function buildRequestsForm(){   
    if(file_exists(RM__PLUGIN_DIR."/templates/request-form.php")){
        require_once(RM__PLUGIN_DIR."/templates/request-form.php");
    }
}

add_shortcode('RequestsForm', 'buildRequestsForm');

class RequestManager{
    
    function initSettings(){
        add_menu_page("Requests Manager Settings", "Заявки", "manage_options", "requests-manager", array("RequestManager", "requestEditor"));
        add_submenu_page("requests-manager", "Налаштування", "Налаштування", "manage_options", "rm-settings", array("RequestManager", "requestManagerSettings"));
    }

	function InitDB(){
        require_once(RM__PLUGIN_DIR."/db-init.php");
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
            <!-- Nav tabs -->
            <ul class="nav nav-tabs" role="tablist">
                <li role="presentation" class="active"><a href="#requests" aria-controls="requests" role="tab" data-toggle="tab">Заявки</a></li>
                <li role="presentation"><a href="#athletes" aria-controls="athletes" role="tab" data-toggle="tab">Спортсмени</a></li>
                <li role="presentation"><a href="#coaches" aria-controls="coaches" role="tab" data-toggle="tab">Тренери</a></li>
                <li role="presentation"><a href="#nominations" aria-controls="nominations" role="tab" data-toggle="tab">Номінації</a></li>
                <li role="presentation"><a href="#delegation" aria-controls="delegation" role="tab" data-toggle="tab">Делегація</a></li>
                <li role="presentation"><a href="#visaSupport" aria-controls="visaSupport" role="tab" data-toggle="tab">Візова підтримка</a></li>
            </ul>
            <!-- Tab panes --> 
            <div class="tab-content">
                <div role="tabpanel" class="tab-pane active" id="requests">
                <?php   
                    if(file_exists(RM__PLUGIN_DIR."/templates/requests.php")){
                        require_once(RM__PLUGIN_DIR."/templates/requests.php");
                    }
                ?>
                </div>
                <div role="tabpanel" class="tab-pane" id="athletes">
                <?php
                    if(file_exists(RM__PLUGIN_DIR."/templates/users.php")){
                        require_once(RM__PLUGIN_DIR."/templates/users.php");
                    }
                ?>
                </div>
                <div role="tabpanel" class="tab-pane" id="coaches">
                    <?php
                        if(file_exists(RM__PLUGIN_DIR."/templates/coaches.php")){
                            require_once(RM__PLUGIN_DIR."/templates/coaches.php");
                        }
                    ?>
                </div>
                <div role="tabpanel" class="tab-pane" id="nominations">
                <?php   
                    if(file_exists(RM__PLUGIN_DIR."/templates/nominations.php")){
                        require_once(RM__PLUGIN_DIR."/templates/nominations.php");
                    }
                ?>
                </div>
                <div role="tabpanel" class="tab-pane" id="delegation">
                <?php   
                    if(file_exists(RM__PLUGIN_DIR."/templates/delegation.php")){
                        require_once(RM__PLUGIN_DIR."/templates/delegation.php");
                    }
                ?>
                </div>
                <div role="tabpanel" class="tab-pane" id="visaSupport">
                <?php   
                    if(file_exists(RM__PLUGIN_DIR."/templates/visa.php")){
                        require_once(RM__PLUGIN_DIR."/templates/visa.php");
                    }
                ?>
                </div>                                                
            </div>           
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
                <li role="presentation" class="active"><a href="#games" aria-controls="games" role="tab" data-toggle="tab">Змагання</a></li>
                <li role="presentation"><a href="#categories" aria-controls="categories" role="tab" data-toggle="tab">Категорії</a></li>
                <li role="presentation"><a href="#regions" aria-controls="regions" role="tab" data-toggle="tab">Області</a></li>
                <li role="presentation"><a href="#others" aria-controls="others" role="tab" data-toggle="tab">Інші</a></li>
            </ul>

            <!-- Tab panes -->
            <div class="tab-content">
                <div role="tabpanel" class="tab-pane active" id="games">
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
                <div role="tabpanel" class="tab-pane" id="regions">
                <?php 
                    if(file_exists(RM__PLUGIN_DIR."/templates/regions-manager.php")){
                        require_once(RM__PLUGIN_DIR."/templates/regions-manager.php");
                    }
                ?>
                </div>
                <div role="tabpanel" class="tab-pane" id="others">
                <?php
                    if(file_exists(RM__PLUGIN_DIR."/templates/others.php")){
                        require_once(RM__PLUGIN_DIR."/templates/others.php");
                    }
                ?>
                </div>
            </div>

        </div>
        <?php
    }
}
?>