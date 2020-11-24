from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from geoalchemy2 import Geometry, func

app = Flask(__name__)
app.config.from_object("project.config.Config")

db = SQLAlchemy()
db.init_app(app)


@app.route("/")
def hello_world():
    return jsonify(hello="world")


class Shop(db.Model):
    __tablename__ = "Shops"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    shop_name = db.Column(db.String(100))
    address = db.Column(db.String(200))
    owner = db.Column(db.String(100))
    phone_no = db.Column(db.Float)
    longitude = db.Column(db.Float)
    latitude = db.Column(db.Float)
    geo = db.Column(Geometry(geometry_type="POINT"))

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
    __tablename__ = "Products"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    product_name = db.Column(db.String(100))
    p_type = db.Column(db.String(100))
    description = db.Column(db.String(100))
	

