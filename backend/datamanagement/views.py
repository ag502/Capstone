from preprocessor.models import VideoData
from rest_framework.views import APIView
from django.http import HttpResponse, JsonResponse
from . import data_manager


class DataDelete(APIView):
    @staticmethod
    def post(request):
        delete_list = request.data
        print(delete_list)
        try:
            data_manager.data_delete(delete_list)  # S3 데이터 삭제 예정
            data_manager.db_delete(delete_list)  # DB 삭제

        except Exception as err:
            print('{} error!!'.format(err))

        return HttpResponse("delete")

