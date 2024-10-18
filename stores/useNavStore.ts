
export const useNavStore = () => useState('nav', () => false);

export const toggleNav = () => {
    useNavStore().value = !useNavStore().value;
}