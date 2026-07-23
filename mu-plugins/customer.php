<?php

/*=======================================
 *  Meme probleme que pour /orders : wp-json/wc/v3/customers exige les cles
 *  API WooCommerce reservees aux admins. On expose une route custom,
 *  utilisable avec le JWT du user, qui renvoie les donnees WooCommerce
 *  (facturation/livraison) du client actuellement connecte uniquement.
 *  =============================================*/

add_action('rest_api_init', function () {
    register_rest_route('custom/v1', '/customer', [
        'methods'             => 'GET',
        'callback'            => 'headless_get_current_customer',
        'permission_callback' => function () {
            return is_user_logged_in();
        },
    ]);
});

function headless_get_current_customer($request)
{
    if (!class_exists('WC_Customer')) {
        return new WP_Error('woocommerce_unavailable', 'WooCommerce est requis pour cette fonctionnalite.', ['status' => 500]);
    }

    $user_id  = get_current_user_id();
    $customer = new WC_Customer($user_id);

    return rest_ensure_response([
        'billing'        => [
            'firstName' => $customer->get_billing_first_name(),
            'lastName'  => $customer->get_billing_last_name(),
            'company'   => $customer->get_billing_company(),
            'address1'  => $customer->get_billing_address_1(),
            'address2'  => $customer->get_billing_address_2(),
            'city'      => $customer->get_billing_city(),
            'state'     => $customer->get_billing_state(),
            'postcode'  => $customer->get_billing_postcode(),
            'country'   => $customer->get_billing_country(),
            'phone'     => $customer->get_billing_phone(),
        ],
        'shipping'       => [
            'firstName' => $customer->get_shipping_first_name(),
            'lastName'  => $customer->get_shipping_last_name(),
            'company'   => $customer->get_shipping_company(),
            'address1'  => $customer->get_shipping_address_1(),
            'address2'  => $customer->get_shipping_address_2(),
            'city'      => $customer->get_shipping_city(),
            'state'     => $customer->get_shipping_state(),
            'postcode'  => $customer->get_shipping_postcode(),
            'country'   => $customer->get_shipping_country(),
        ],
        'ordersCount'    => function_exists('wc_get_customer_order_count') ? wc_get_customer_order_count($user_id) : null,
        'totalSpent'     => function_exists('wc_get_customer_total_spent') ? wc_get_customer_total_spent($user_id) : null,
    ]);
}
