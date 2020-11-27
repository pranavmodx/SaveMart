from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from geoalchemy2 import Geometry, func
from geoalchemy2.elements import WKTElement

app = Flask(__name__)
db = SQLAlchemy()


@app.route('/hot_deals', methods=['GET'])
def hot_deals():
    latitude = request.args.get('latitude')
    longitude = request.args.get('longitude')

    user_location = WKTElement(f'POINT({latitude} {longitude})', srid=4326)
    print(user_location)

    nearby_shops = Shop.query.filter(func.ST_DistanceSphere(Shop.geo, user_location) < 10).all()

    print(Shop.query.first())
    print(nearby_shops)

    query = db.session.query('Product_Shop', func.min('Product_Shop.price').label('price')).group_by('Product_Shop.product_id')

    print(query)


    # print(latitude)
    # print(longitude)

    return jsonify({'latitude': latitude})



product_shop = db.Table('Product_Shop',
    db.Column('id', db.Integer, primary_key=True, autoincrement=True),
    db.Column('shop_id', db.Integer, db.ForeignKey('Shop.id')),
    db.Column('product_id', db.Integer, db.ForeignKey('Product.id')),
    db.Column('price', db.Float),
)


class Shop(db.Model):
    __tablename__ = "Shop"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    shop_name = db.Column(db.String(100))
    address = db.Column(db.String(200))
    owner = db.Column(db.String(100))
    phone_no = db.Column(db.Float)
    longitude = db.Column(db.Float)
    latitude = db.Column(db.Float)
    geo = db.Column(Geometry(geometry_type="POINT"))
    products = db.relationship(
        "Product",
        secondary=product_shop,
        back_populates="shops")

    def __repr__(self):
        return "<Shop {name} ({lat}, {lon})>".format(
            name=self.shop_name, lat=self.latitude, lon=self.longitude)

    def get_shop_within_radius(self, radius):
        """Return all cities within a given radius (in meters) of this city."""

        return Shop.query.filter(func.ST_DistanceSphere(Shop.geo, self.geo) < radius).all()

    @classmethod
    def add_shop(cls, shop_name, address, longitude, latitude):
        """Put a new city in the database."""

        geo = 'POINT({} {})'.format(longitude, latitude)
        shop = Shop(shop_name=shop_name,
                    address=address,
                    longitude=longitude,
                    latitude=latitude,
                    geo=geo)

        db.session.add(shop)
        db.session.commit()

    @classmethod
    def update_geometries(cls):
        """Using each city's longitude and latitude, add geometry data to db."""

        shop = Shop.query.all()

        for shop in shop:
            point = 'POINT({} {})'.format(shop.longitude, shop.latitude)
            shop.geo = point

        db.session.commit()


class Product(db.Model):
    __tablename__ = "Product"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    product_name = db.Column(db.String(100))
    shops = db.relationship(
        "Shop",
        secondary=product_shop,
        back_populates="products")


def connect_to_db(app):
    URI = 'postgres://admin:admin123@localhost:5432/savemart'
    app.config['SQLALCHEMY_DATABASE_URI'] = URI
    app.config['SQLALCHEMY_ECHO'] = False
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.app = app
    db.init_app(app)


if __name__ == "__main__":
    connect_to_db(app)
    # db.drop_all()
    db.create_all()
    print("Connected to database.")
    app.run(debug=True)
