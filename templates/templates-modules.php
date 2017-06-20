<?php  
    function templates_modules(){      
        wp_register_script( 'polyfills_script', plugins_url( '../js/polyfills.js', __FILE__ ) );
        wp_enqueue_script(  'polyfills_script');
        wp_register_script( 'spinner_script', plugins_url( '../js/spinner.js', __FILE__ ) );
        wp_enqueue_script(  'spinner_script');
        wp_register_script( 'grid_script', plugins_url( '../js/grid.js', __FILE__ ) );
        wp_enqueue_script(  'grid_script');
        wp_register_script( 'form_script', plugins_url( '../js/form.js', __FILE__ ) );
        wp_enqueue_script(  'form_script');  
        wp_register_script( 'alert_script', plugins_url( '../js/alert.js', __FILE__ ) );
        wp_enqueue_script(  'alert_script');
        wp_register_script( 'paging_script', plugins_url( '../js/paging.js', __FILE__ ) );
        wp_enqueue_script(  'paging_script');  
        wp_register_script( 'file_saver_script', plugins_url( '../js/FileSaver.min.js', __FILE__ ) );
        wp_enqueue_script(  'file_saver_script');    
        wp_register_script( 'wordexport_script', plugins_url( '../js/jquery.wordexport.js', __FILE__ ) );
        wp_enqueue_script(  'wordexport_script');  
        wp_register_script( 'print_script', plugins_url( '../js/jQuery.print.js', __FILE__ ) );
        wp_enqueue_script(  'print_script');                        
        wp_register_script( 'requestsServices_script', plugins_url( '../js/requests/service.js', __FILE__ ) );
        wp_enqueue_script(  'requestsServices_script');         
        wp_register_script( 'requestsClass_script', plugins_url( '../js/requests/requestsClass.js', __FILE__ ) );
        wp_enqueue_script(  'requestsClass_script');                
        wp_register_script( 'requests_script', plugins_url( '../js/requests/requests.js', __FILE__ ) );
        wp_enqueue_script(  'requests_script');   
        wp_register_script( 'nominations_script', plugins_url( '../js/nominations/nominations.js', __FILE__ ) );
        wp_enqueue_script(  'nominations_script');     
        wp_register_script( 'visa_script', plugins_url( '../js/visa/visa.js', __FILE__ ) );
        wp_enqueue_script(  'visa_script');                     
        wp_register_script( 'delegation_script', plugins_url( '../js/delegation/delegation.js', __FILE__ ) );
        wp_enqueue_script(  'delegation_script');          
    }
    add_action('admin_footer', 'templates_modules');
?>