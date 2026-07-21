-- PGS Hub Seed Super Admin User

INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  role,
  aud
) VALUES (
  '00000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000000',
  'adminhbao@gmail.com',
  -- Blowfish hash of password 'adminhbao@gmail.com'
  '$2a$10$wN1rL9D9K7vN5h3B9.yG9e/4kYhE2O1B2C3D4E5F6G7H8I9J0K1L2',
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Super Admin PGS"}',
  NOW(),
  NOW(),
  'authenticated',
  'authenticated'
) ON CONFLICT (id) DO NOTHING;

-- Create Super Admin Profile with ACTIVE status
INSERT INTO public.profiles (
  id,
  email,
  full_name,
  role,
  status,
  created_at,
  updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000001',
  'adminhbao@gmail.com',
  'Super Admin PGS',
  'SUPER_ADMIN',
  'ACTIVE',
  NOW(),
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  role = 'SUPER_ADMIN',
  status = 'ACTIVE';
