import psycopg2

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
        try:
            cmd = f"""
                        COPY "Shop" (shop_name, longitude, latitude, address) 
                        FROM STDIN WITH (FORMAT CSV, HEADER TRUE);
                    """
            cursor.copy_expert(cmd, f)
            db.commit()
        except Exception as e:
            print(f"Error due to {e}")
            db.rollback()


if __name__ == "__main__":
    add_shop_data('../data/shop_data.csv')

