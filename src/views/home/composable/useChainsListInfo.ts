import { Ref, ComputedRef } from 'vue';
import { IIbcChains, IIbcchain, TIbcChainsKeys } from '@/types/interface/index.interface';
import { ANCHORS_DATAS, CHAINS_MENUS, CURRENT_MENU_TYPE } from '@/constants';

export const useAnchors = (chainList: Ref<IIbcChains>, emits: any) => {
    const menus = reactive(CHAINS_MENUS);
    const currentMenu = ref<CURRENT_MENU_TYPE[]>([menus[0].value as CURRENT_MENU_TYPE]);
    const scrollListRef = ref();
    const linkListRef = ref();
    const lock = ref(false);
    const anchors = reactive(ANCHORS_DATAS);
    let once = true;

    const highlightedLabel = (label: string) => {
        const queryDomId = `a-link${label}`;
        const labelContainerDom = linkListRef.value;
        if (labelContainerDom) {
            const children = labelContainerDom.children;
            for (let i = 0; i < children.length; i++) {
                const element = children[i];
                element.id === queryDomId
                    ? element.classList.add('self_link_active')
                    : element.classList.remove('self_link_active');
            }
        } else {
            console.log('labelContainerDom Dom no render');
        }
    };

    const findClassName = (prettyName: string) => {
        const chainQuery = prettyName[0].toUpperCase();
        const findAnchor = anchors.find((anchor) => anchor.collection.includes(chainQuery));
        const className = findAnchor?.title || '#';
        // Initial value, the first time the first chain corresponding tag is selected
        if (once) {
            once = false;
            nextTick(() => {
                highlightedLabel(className);
            });
        }
        return className;
    };

    // Click the highlighted tag, scroll to the appropriate position
    const onClickAnchor = (label: string) => {
        highlightedLabel(label);
        const scrollDom = scrollListRef.value.$el;
        if (!scrollDom) return;
        const findItem = document.getElementsByClassName(label)[0];
        if (findItem) {
            scrollDom.scrollTop = (findItem as any).parentElement.offsetTop;
            lock.value = true;
        } else {
            scrollDom.scrollTop = scrollDom.scrollHeight - scrollDom.clientHeight;
            lock.value = true;
        }
    };

    const sortChainList: ComputedRef<IIbcChains> = computed<IIbcChains>(() => {
        const res: IIbcChains = {
            all: [],
            active: [],
            inactive: []
        };

        Object.keys(chainList.value).forEach((key) => {
            res[key as TIbcChainsKeys] = chainList.value[key as TIbcChainsKeys]
                .slice()
                .sort((a: IIbcchain, b: IIbcchain) => {
                    return a.pretty_name.toLowerCase() < b.pretty_name.toLowerCase()
                        ? -1
                        : a.pretty_name.toLowerCase() > b.pretty_name.toLowerCase()
                        ? 1
                        : 0;
                });
        });

        return res;
    });

    onMounted(() => {
        const scrollDom = scrollListRef.value.$el;
        scrollDom.onscroll = () => {
            if (lock.value) {
                lock.value = false;
                return;
            }
            // Get the current highlighted tag through scrolling
            const containerDom: HTMLDivElement | null =
                document.querySelector('#card_list .ant-row');
            if (containerDom) {
                const cardDomList = Array.from(containerDom.children) as HTMLDivElement[];
                const scrollTop: number = scrollDom.scrollTop;
                const findCard = cardDomList.find((card: any) => {
                    const calculate: number = scrollTop - card.offsetTop;
                    return 0 <= calculate && calculate < 144;
                });
                const listID = findCard?.children[0]?.children[0]?.id;
                if (listID) {
                    const label = listID.replace('list', '');
                    highlightedLabel(label);
                }
            } else {
                console.log('list containerDom no render');
            }
        };
    });

    const onSelectedMenu = ({ key }: { key: any }) => {
        (window as any).gtag('event', 'Home-点击链接', {
            clickLink: `Active、InActive、All区域点击${key}`
        });

        highlightedLabel(ANCHORS_DATAS[0].title);
        const currentChainList = chainList.value[currentMenu.value[0]];
        currentChainList.sort((a: IIbcchain, b: IIbcchain) => {
            return a.pretty_name.toLowerCase() < b.pretty_name.toLowerCase()
                ? -1
                : a.pretty_name.toLowerCase() > b.pretty_name.toLowerCase()
                ? 1
                : 0;
        });
        if (!(currentChainList && currentChainList.length > 0)) return;
        const scrollDom = scrollListRef.value.$el;
        if (!scrollDom) return;
        // Find the tag that matches the current list through the tag, and then scroll to the appropriate position according to the tag
        // 1. If the current highlighted tag page can be found, the current highlighted tag is used as the standard
        // 2. If the current highlighted tag can be found by searching upwards, the found one is used as the standard
        // 3. If the search upwards fails, the first matching tag in the data list is used
        const id = document.querySelector('.self_link_active')?.id;
        let label: string;
        if (id) {
            label = id.replace('a-link', '');
        } else {
            return;
        }
        const currentChainNameList = currentChainList.map((chain) =>
            chain.chain_name[0].toUpperCase()
        );
        let findIndex = ANCHORS_DATAS.findIndex((item) => item.title === label);
        let isSuccess = false;
        let sureChainNameList = ANCHORS_DATAS[findIndex].collection;
        // Termination condition isSuccess success or findIndex <= 0
        while (!(isSuccess || findIndex <= 0)) {
            for (let i = 0; i < sureChainNameList.length; i++) {
                if (currentChainNameList.includes(sureChainNameList[i])) {
                    label = ANCHORS_DATAS[findIndex].title;
                    isSuccess = true;
                    break;
                }
            }
            if (!isSuccess) {
                findIndex--;
                sureChainNameList = ANCHORS_DATAS[findIndex].collection;
            }
        }
        // If not found, use the first data in the list to determine the highlighted tag
        if (!isSuccess) {
            label = findClassName(currentChainList[0].pretty_name);
        }
        lock.value = true;
        setTimeout(() => {
            onClickAnchor(label);
        }, 0);
        emits('onMenuSelected', key);
    };

    const clickListItem = ({ type, value }: { type: any; value: any }) => {
        emits('clickItem', { type, value });
    };

    return {
        menus,
        currentMenu,
        anchors,
        scrollListRef,
        linkListRef,
        findClassName,
        onClickAnchor,
        onSelectedMenu,
        clickListItem,
        sortChainList
    };
};
