-- Seed static data into Supabase (run after 001_initial_schema.sql)

INSERT INTO package_categories (id, name, slug, display_order, is_active) VALUES
  ('portraits', 'Portraits', 'portraits', 1, true),
  ('families', 'Families', 'families', 2, true),
  ('events', 'Events', 'events', 3, true),
  ('weddings', 'Weddings', 'weddings', 4, true),
  ('pre-wedding', 'Pre-Wedding', 'pre-wedding', 5, true),
  ('headshots', 'Headshots', 'headshots', 6, true),
  ('brand', 'Brand Photography', 'brand', 7, true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO packages (id, category_id, name, price, duration, features, is_popular, display_order, is_active) VALUES
  ('portrait-mini', 'portraits', 'Mini', '$125', '20 minutes', '["5 edited photos","1 outfit","Online gallery"]', false, 1, true),
  ('portrait-basic', 'portraits', 'Basic', '$200', '40 minutes', '["10 edited photos","1 outfit","Online gallery"]', false, 2, true),
  ('portrait-standard', 'portraits', 'Standard', '$275', '60 minutes', '["20 edited photos","2 outfits","Online gallery","Light retouching"]', true, 3, true),
  ('family-small', 'families', 'Small Family', '$300', '45 minutes', '["Up to 5 people","12 edited photos"]', false, 1, true),
  ('family-standard', 'families', 'Standard Family', '$425', '60 minutes', '["Up to 8 people","20 edited photos"]', true, 2, true),
  ('wedding-intimate', 'weddings', 'Intimate', '$1,500', '4 hours', '["200+ edited photos","Online gallery"]', false, 1, true),
  ('wedding-classic', 'weddings', 'Classic', '$2,500', '8 hours', '["400+ edited photos"]', true, 2, true),
  ('headshot-quick', 'headshots', 'Quick Headshot', '$150', '15 minutes', '["3 edited photos"]', false, 1, true),
  ('brand-starter', 'brand', 'Starter Brand Session', '$350', '1 hour', '["15 edited photos","1 look"]', false, 1, true)
ON CONFLICT (id) DO NOTHING;

-- Verbatim client reviews

INSERT INTO testimonials (client_name, review, rating, session_type, is_featured, display_order) VALUES
  (
    'Angelina',
    'they are beautiful! you did a wonderful job 10 outta 10 would recommend again 🤏🏼🙂‍↕️',
    5,
    'Client',
    true,
    1
  ),
  (
    'dami',
    'I love them they are beautiful, I always don''t like taking pictures cause I always think I''m not photogenic but is a lie oooo… I fineeee. Did a great job 👏🏾',
    5,
    'Portrait Session',
    true,
    2
  ),
  (
    'Candee',
    'Capturedbylulu did a fantastic job for doing my birthday photoshoot. It was an amazing experience. It was very patient and the photo edit came out perfect got lot of compliments.',
    5,
    'Birthday Photoshoot',
    true,
    3
  ),
  (
    'Michael',
    'Hands down the most versatile photographer I''ve worked with from solemn church thanksgiving services to the vibrant energy of weddings, naming ceremonies, engagements, and birthdays, every moment was captured beautifully. They read the room perfectly: quiet and reverent during sacred moments, then fully in the mix catching every dance and candid smile at the reception. Editing was crisp, turnaround was fast, and skin tones looked natural and rich. If you need any event covered book them. I''ll be using them for every occasion going forward. Ten out of ten.',
    5,
    'Truly Exceptional · Events & Weddings',
    true,
    4
  ),
  (
    'Peter',
    'Captured by Lulu is an amazing photographer. He handled my photo shoot with care and professionalism. I would definitely recommend him, and I got my pictures in time for my birthday. Very excellent.',
    5,
    'Birthday Photoshoot',
    true,
    5
  ),
  (
    'Eniola Tanimonu',
    'Working with her was an incredible experience from start to finish. She made the entire shoot feel comfortable and natural, and her attention to detail was evident in every part of the process. The photos exceeded my expectations — they were beautifully edited, captured genuine moments, and reflected exactly the vision I had in mind. Beyond her talent behind the camera, she''s professional, communicates clearly, and truly cares about delivering high-quality work. If you''re looking for someone who is creative, reliable, and passionate about photography, I couldn''t recommend her more. I''ll definitely be booking with her again.',
    5,
    'Client',
    true,
    6
  ),
  (
    'Oba Bunmi',
    'The word captured literally defines the quality and expression of joy you will experience the moment your service is booked. Whether you are celebrating a small milestone or a major achievement you can absolutely count on Lulu to make it a memorable moment. 5 plus star.',
    5,
    'Client',
    true,
    7
  );

INSERT INTO site_content (key, value) VALUES
  ('hero', '{"eyebrow":"San Antonio, Texas","title":"Photographs that breathe with emotion","subtitle":"Luxury photography for weddings, portraits, families, and events. Every frame is crafted to tell your story."}'),
  ('about', '{"eyebrow":"About CapturedByLulu","title":"Hi, I''m Lulu","body":"San Antonio photographer specializing in weddings, portraits, families, and events."}'),
  ('cta', '{"eyebrow":"Let''s Create Together","title":"Ready to tell your story?","description":"Reach out to check availability, ask a question, or start planning your session with Lulu.","ctaLabel":"Book a Session"}'),
  ('seo', '{"title":"Luxury Photography in San Antonio","description":"Weddings, portraits, families, and events by CapturedByLulu in San Antonio, Texas."}')
ON CONFLICT (key) DO NOTHING;

INSERT INTO site_settings (key, value) VALUES
  ('business', '{"name":"CapturedByLulu","email":"Capturedbylulu63@gmail.com","phone":"+1 (346) 907-1945","address":"San Antonio, Texas"}'),
  ('social', '{"instagram":"@capturedbylulu_","instagramUrl":"https://www.instagram.com/capturedbylulu_/","facebook":"","tiktok":""}'),
  ('hours', '{"weekdays":"By appointment","saturday":"By appointment","sunday":"Closed"}'),
  ('branding', '{"logoUrl":"/logo.png","faviconUrl":"/logo.png"}')
ON CONFLICT (key) DO NOTHING;

-- After creating admin user in Supabase Auth dashboard:
-- UPDATE profiles SET is_admin = true WHERE email = 'your-admin@email.com';
