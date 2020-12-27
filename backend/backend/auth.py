from dj_rest_auth.views import LoginView


class CustomLoginView(LoginView):
    def get_response(self):
        orginal_response = super().get_response()
        data = {"user_id": self.user.id, "status": "success"}
        orginal_response.data.update(data)
        return orginal_response
