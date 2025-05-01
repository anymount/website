create table public.notifications (
    id uuid default uuid_generate_v4() primary key,
    title text not null,
    message text not null,
    type text not null check (type in ('info', 'warning', 'success', 'error')),
    active boolean default true,
    link text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    expires_at timestamp with time zone
);

-- Criar políticas de segurança
alter table public.notifications enable row level security;

create policy "Notificações são visíveis para todos"
    on public.notifications for select
    using (true);

create policy "Apenas administradores podem criar notificações"
    on public.notifications for insert
    to authenticated
    using (auth.role() = 'admin');

create policy "Apenas administradores podem atualizar notificações"
    on public.notifications for update
    to authenticated
    using (auth.role() = 'admin');

create policy "Apenas administradores podem deletar notificações"
    on public.notifications for delete
    to authenticated
    using (auth.role() = 'admin'); 