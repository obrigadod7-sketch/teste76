#!/usr/bin/env python3
"""
Script para popular o banco com dados iniciais
"""

import asyncio
import os
from pathlib import Path
from datetime import datetime, timezone
import sys

# Adicionar o diretório backend ao path
sys.path.insert(0, '/app/backend')

async def popular_dados():
    from motor.motor_asyncio import AsyncIOMotorClient
    from dotenv import load_dotenv
    import bcrypt
    import uuid
    
    # Carregar .env
    load_dotenv('/app/backend/.env')
    
    mongo_url = os.environ.get('MONGO_URL')
    db_name = os.environ.get('DB_NAME', 'watizat_db')
    
    print("\n" + "="*60)
    print("  🌱 POPULANDO BANCO DE DADOS")
    print("="*60 + "\n")
    
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    # 1. Criar usuários de exemplo
    print("📝 Criando usuários de exemplo...")
    
    usuarios_existentes = await db.users.count_documents({})
    
    if usuarios_existentes >= 3:
        print(f"✅ Já existem {usuarios_existentes} usuários cadastrados")
    else:
        usuarios = [
            {
                'id': str(uuid.uuid4()),
                'email': 'admin@watizat.com',
                'password': bcrypt.hashpw('admin123'.encode(), bcrypt.gensalt()).decode(),
                'name': 'Administrador',
                'role': 'admin',
                'languages': ['pt', 'en', 'fr'],
                'created_at': datetime.now(timezone.utc).isoformat()
            },
            {
                'id': str(uuid.uuid4()),
                'email': 'voluntario@exemplo.com',
                'password': bcrypt.hashpw('senha123'.encode(), bcrypt.gensalt()).decode(),
                'name': 'Maria Silva',
                'role': 'volunteer',
                'languages': ['pt', 'fr'],
                'professional_area': 'legal',
                'help_categories': ['legal', 'housing'],
                'created_at': datetime.now(timezone.utc).isoformat()
            },
            {
                'id': str(uuid.uuid4()),
                'email': 'migrante@exemplo.com',
                'password': bcrypt.hashpw('senha123'.encode(), bcrypt.gensalt()).decode(),
                'name': 'João Santos',
                'role': 'migrant',
                'languages': ['pt'],
                'need_categories': ['food', 'housing'],
                'created_at': datetime.now(timezone.utc).isoformat()
            }
        ]
        
        for user in usuarios:
            existing = await db.users.find_one({'email': user['email']})
            if not existing:
                await db.users.insert_one(user)
                print(f"   ✅ {user['name']} ({user['role']})")
    
    # 2. Criar posts de exemplo
    print("\n📋 Criando posts de exemplo...")
    
    posts_existentes = await db.posts.count_documents({})
    
    if posts_existentes >= 3:
        print(f"✅ Já existem {posts_existentes} posts")
    else:
        # Pegar ID do migrante
        migrante = await db.users.find_one({'role': 'migrant'})
        voluntario = await db.users.find_one({'role': 'volunteer'})
        
        if migrante and voluntario:
            posts = [
                {
                    'id': str(uuid.uuid4()),
                    'user_id': migrante['id'],
                    'type': 'need',
                    'category': 'food',
                    'title': 'Preciso de ajuda com alimentação',
                    'description': 'Olá, estou precisando de ajuda para conseguir alimentos. Cheguei recentemente em Paris e ainda não tenho trabalho.',
                    'created_at': datetime.now(timezone.utc).isoformat(),
                    'images': []
                },
                {
                    'id': str(uuid.uuid4()),
                    'user_id': voluntario['id'],
                    'type': 'offer',
                    'category': 'legal',
                    'title': 'Ofereço ajuda jurídica gratuita',
                    'description': 'Sou advogada e posso ajudar com documentação, visto e questões legais. Atendo em português e francês.',
                    'created_at': datetime.now(timezone.utc).isoformat(),
                    'images': []
                },
                {
                    'id': str(uuid.uuid4()),
                    'user_id': migrante['id'],
                    'type': 'need',
                    'category': 'housing',
                    'title': 'Procuro moradia temporária',
                    'description': 'Preciso de um lugar para ficar por algumas semanas enquanto procuro trabalho e moradia definitiva.',
                    'created_at': datetime.now(timezone.utc).isoformat(),
                    'images': []
                }
            ]
            
            for post in posts:
                await db.posts.insert_one(post)
                print(f"   ✅ {post['title']}")
    
    # 3. Criar anúncios motivacionais
    print("\n💪 Criando anúncios motivacionais...")
    
    ads_existentes = await db.advertisements.count_documents({})
    
    if ads_existentes >= 2:
        print(f"✅ Já existem {ads_existentes} anúncios")
    else:
        anuncios = [
            {
                'id': str(uuid.uuid4()),
                'type': 'motivation',
                'title': '💪 Você é mais forte do que imagina!',
                'content': 'Cada dia é uma nova oportunidade. Não desista dos seus sonhos.',
                'is_active': True,
                'priority': 10,
                'created_at': datetime.now(timezone.utc)
            },
            {
                'id': str(uuid.uuid4()),
                'type': 'motivation',
                'title': '🙏 Você não está sozinho',
                'content': 'Há muitas pessoas dispostas a ajudar. Continue com fé!',
                'is_active': True,
                'priority': 9,
                'created_at': datetime.now(timezone.utc)
            }
        ]
        
        for ad in anuncios:
            await db.advertisements.insert_one(ad)
            print(f"   ✅ {ad['title']}")
    
    # Resumo final
    print("\n" + "="*60)
    print("  📊 RESUMO DO BANCO DE DADOS")
    print("="*60 + "\n")
    
    total_users = await db.users.count_documents({})
    total_posts = await db.posts.count_documents({})
    total_ads = await db.advertisements.count_documents({})
    
    print(f"👥 Usuários: {total_users}")
    print(f"📋 Posts: {total_posts}")
    print(f"💪 Anúncios: {total_ads}")
    
    print("\n" + "="*60)
    print("  🎉 BANCO POPULADO COM SUCESSO!")
    print("="*60 + "\n")
    
    print("📝 Contas de teste criadas:\n")
    print("   👨‍💼 Admin:")
    print("      Email: admin@watizat.com")
    print("      Senha: admin123\n")
    
    print("   🤝 Voluntário:")
    print("      Email: voluntario@exemplo.com")
    print("      Senha: senha123\n")
    
    print("   🌍 Migrante:")
    print("      Email: migrante@exemplo.com")
    print("      Senha: senha123\n")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(popular_dados())
