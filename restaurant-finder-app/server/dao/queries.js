module.exports = {

    //User queries
    get_cities : "SELECT c.* FROM cities c INNER JOIN restaurant_branch rb ON rb.city_id = c.id GROUP BY c.id;",
    get_restaurants_for_cities : "SELECT r.id AS restaurant_id, r.restaurant_name, rb.id as branch_id, rb.locality, GROUP_CONCAT(cu.cuisine_name) AS cuisines FROM restaurant_branch rb INNER JOIN cities c ON c.id = rb.city_id AND c.id IN (?) INNER JOIN restaurant_defn r ON r.id = rb.restaurant_id INNER JOIN restaurant_cuisine_map rcm ON rcm.branch_id = rb.id INNER JOIN cuisine_defn cu ON cu.id = rcm.cuisine_id GROUP BY rb.id;",
    get_restaurant_location : "SELECT rd.restaurant_name, rb.locality, rb.street, rb.locality, c.city, c.state, cou.country_name, GROUP_CONCAT(DISTINCT cu.cuisine_name) AS cuisines FROM restaurant_branch rb INNER JOIN restaurant_defn rd ON rb.id IN (?) AND rd.id = rb.restaurant_id INNER JOIN restaurant_cuisine_map rcm ON rcm.branch_id = rb.id INNER JOIN cuisine_defn cu ON cu.id = rcm.cuisine_id INNER JOIN cities c ON c.id = rb.city_id INNER JOIN countries cou ON cou.country_code = c.country_code GROUP BY rb.id;",
    get_menu : "SELECT d.dish_name, rm.description FROM restaurant_branch rb INNER JOIN restaurant_menu rm ON rm.branch_id = rb.id AND rb.id IN (?) INNER JOIN dishes d ON d.id = rm.dish_id;",

    //Owner queries: Restaurant creation
    get_cuisines : "select id as cuisine_id,cuisine_name from cuisine_defn where cuisine_name in (?) group by cuisine_name;",
    get_dishes : "select id as dish_id,dish_name from dishes where dish_name in (?) group by dish_name;",
    insert_cuisines : "INSERT INTO cuisine_defn (`cuisine_name`) VALUES ?;",
    insert_dishes : "INSERT INTO dishes(`dish_name`) VALUES ?;",
    insert_rest_defn : "INSERT INTO restaurant_defn(`restaurant_name`) VALUES ?;",
    insert_rest_branch : "INSERT INTO restaurant_branch (`restaurant_id`,`latitude`,`longitude`,`street`,`locality`,`city_id`) VALUES ?;",
    insert_rest_cuisine_map : "INSERT INTO restaurant_cuisine_map(`branch_id`,`cuisine_id`) VALUES ?;",
    insert_rest_menu : "INSERT INTO restaurant_menu(`branch_id`,`dish_id`,`description`) VALUES ?;"

}