from main import redis, Product
import time

key = 'order_completed'
group = 'inventory-group'

try:
    redis.xgroup_create(key, group)
except:
    print('Group already exists!')

while True:
    try:
        results = redis.xreadgroup(group, key, {key: '>'}, None)

        if results != []:
            for result in results:
                print(result)
                obj = result[1][0][1]
                try:
                    product = Product.get(obj['product_id'])
                    product.quantity = product.quantity - int(obj['quantity'])
                    if product.quantity < 0:
                        raise Exception
                    product.save()
                except:
                    redis.xadd('refund_order', obj, '*')

    except Exception as e:
        print(str(e))
    time.sleep(10)
