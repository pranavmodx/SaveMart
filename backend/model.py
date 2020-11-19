from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from geoalchemy2 import Geometry, func

app = Flask(__name__)
db = SQLAlchemy()

# @app.route("/")
# def home():
#     return "Hello, World!"


class Shops(db.Model):
    __tablename__ = "Shops"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    shop_name = db.Column(db.String(100))
    longitude = db.Column(db.Float)
    latitude = db.Column(db.Float)
    geo = db.Column(Geometry(geometry_type="POINT"))
    address = db.Column(db.String(200))
    ph_no = db.Column(db.Float)
    owner = db.Column(db.String(100))

    def __repr__(self):
        return "<Shops {name} ({lat}, {lon})>".format(
            name=self.shop_name, lat=self.latitude, lon=self.longitude)

    def get_shops_within_radius(self, radius):
        """Return all cities within a given radius (in meters) of this city."""

        return Shops.query.filter(func.ST_DistanceSphere(Shops.geo, self.geo) < radius).all()

    @classmethod
    def add_shop(cls, shop_name, address, longitude, latitude):
        """Put a new city in the database."""

        geo = 'POINT({} {})'.format(longitude, latitude)
        shop = Shops(shop_name=shop_name,
                     address=address,
                     longitude=longitude,
                     latitude=latitude,
                     geo=geo)

        db.session.add(shop)
        db.session.commit()

    @classmethod
    def update_geometries(cls):
        """Using each city's longitude and latitude, add geometry data to db."""

        shops = Shops.query.all()

        for shop in shops:
            point = 'POINT({} {})'.format(shop.longitude, shop.latitude)
            shop.geo = point

        db.session.commit()


def connect_to_db(app):
    URI = 'postgres://admin:admin123@localhost:5432/savemart'
    app.config['SQLALCHEMY_DATABASE_URI'] = URI
    app.config['SQLALCHEMY_ECHO'] = False
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.app = app
    db.init_app(app)


if __name__ == "__main__":
    connect_to_db(app)
    db.create_all()
    print("Connected to database.")
    # app.run(debug=True)
