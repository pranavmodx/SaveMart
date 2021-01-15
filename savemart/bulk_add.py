import psycopg2
import csv


db = psycopg2.connect(
    host='localhost',
    user='admin',
    password='admin123',
    database='savemart',
    port=5432
)
cursor = db.cursor()

def add_shop_data(file):
    with open(file, 'r') as f:
        for row in csv.DictReader(f):
            latitude = row.get('latitude')
            longitude = row.get('longitude')
            address = row.get('address')
            name = row.get('shop_name')
            try:
                query = f"""
                        INSERT INTO savemart_shop (name, address, location)
                        VALUES ('{name}', '{address}', ST_GeomFromText('POINT({longitude} {latitude})',4326))
                        """
                cursor.execute(query)
                db.commit()
            except Exception as e:
                print(f"Error due to {e}")
                db.rollback()


if __name__ == "__main__":
    add_shop_data('../data/shop_data.csv')

