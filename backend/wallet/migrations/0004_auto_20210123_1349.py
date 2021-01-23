# Generated by Django 3.1.3 on 2021-01-23 13:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('wallet', '0003_auto_20210114_0942'),
    ]

    operations = [
        migrations.AddField(
            model_name='wallet',
            name='private_key',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Private Key'),
        ),
        migrations.AddField(
            model_name='wallet',
            name='public_key',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Public Key'),
        ),
        migrations.AlterField(
            model_name='wallet',
            name='balance',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10, verbose_name='Balance'),
        ),
        migrations.AlterField(
            model_name='wallet',
            name='currency',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='wallet.currency', verbose_name='Currency'),
        ),
    ]