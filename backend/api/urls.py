from rest_framework import routers
from api import views as api_views


router = routers.DefaultRouter()
router.register(r'items', api_views.ItemViewSet, 'items')

urlpatterns = router.urls
