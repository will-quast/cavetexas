-- Create pages table
create table if not exists public.pages (
  id uuid default uuid_generate_v4() primary key,
  slug text not null unique,
  title text not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  created_by uuid references auth.users not null,
  updated_by uuid references auth.users not null
);

-- Create members table
create table if not exists public.members (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null unique,
  editor boolean default false not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.pages enable row level security;
alter table public.members enable row level security;

-- Create policies for pages table
create policy "Public pages are viewable by everyone"
  on public.pages for select
  using (true);

create policy "Only editors can insert pages"
  on public.pages for insert
  with check (
    exists (
      select 1 from public.members
      where user_id = auth.uid()
      and editor = true
    )
  );

create policy "Only editors can update pages"
  on public.pages for update
  using (
    exists (
      select 1 from public.members
      where user_id = auth.uid()
      and editor = true
    )
  );

create policy "Only editors can delete pages"
  on public.pages for delete
  using (
    exists (
      select 1 from public.members
      where user_id = auth.uid()
      and editor = true
    )
  );

-- Create policies for members table
create policy "Users can view their own member record"
  on public.members for select
  using (user_id = auth.uid());

create policy "Only service role can insert member records"
  on public.members for insert
  with check (auth.role() = 'service_role');

create policy "Only service role can update member records"
  on public.members for update
  using (auth.role() = 'service_role');

create policy "Only service role can delete member records"
  on public.members for delete
  using (auth.role() = 'service_role');

-- Create function to handle updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create triggers for updated_at
create trigger handle_pages_updated_at
  before update on public.pages
  for each row
  execute function public.handle_updated_at();

create trigger handle_members_updated_at
  before update on public.members
  for each row
  execute function public.handle_updated_at(); 