

export default async function logout() {
    const router = useRouter();

    const req = await $fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if(!req.authenticated) {
        router.push('/auth/login');
    }

}