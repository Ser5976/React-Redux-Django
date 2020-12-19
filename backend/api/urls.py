from rest_framework import routers
from api import views as api_views


router = routers.DefaultRouter()
router.register(r'items', api_views.ItemViewSet, 'items')
router.register(r'addresses', api_views.AddressViewSet, 'addresses')
router.register(r'comments', api_views.CommentViewSet, 'comments')
router.register(r'users', api_views.UserViewSet, 'users')

urlpatterns = router.urls
