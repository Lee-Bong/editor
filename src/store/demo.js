        add_drag(state, payload) {
            switch (payload.type) {
                case 1:
                    const textTop = state.editor.phoneHeight / 2 - 30 / 2;
                    const zIndex = state.editor.dragTexts.length ? state.editor.dragTexts[state.editor.dragTexts.length - 1].zIndex + 1 : 0;
                    state.editor.dragTexts.push({
                        isShow: true,
                        zIndex,
                        y: textTop,
                        isActive: true,
                        dragIndex: zIndex,
                    });
                    state.editor.textSet = true;
                    break;
                case 2:
                    const textTop2 = 0;
                    const zIndex2 = state.editor.dragImages.length ? state.editor.dragImages[state.editor.dragImages.length - 1].zIndex + 1 : 0;
                    state.editor.dragImages.push({
                        isShow: true,
                        zIndex: zIndex2,
                        y: textTop2,
                        isActive: true,
                        dragIndex: zIndex2,
                    });
                    state.editor.imgSet = true;
                    break;
                case 3:
                    const textTop3 = 0;
                    const zIndex3 = state.editor.dragLinks.length ? state.editor.dragLinks[state.editor.dragLinks.length - 1].zIndex + 1 : 0;
                    state.editor.dragLinks.push({
                        isShow: true,
                        zIndex: zIndex3,
                        y: textTop3,
                        isActive: true,
                        dragIndex: zIndex3,
                    });
                    state.editor.linkSet = true;
                    break;
                case 4:
                    const textTop4 = 0;
                    const zIndex4 = state.editor.dragImageLists.length ? state.editor.dragImageLists[state.editor.dragImageLists.length - 1].zIndex + 1 : 0;
                    state.editor.dragImageLists.push({
                        isShow: true,
                        zIndex: zIndex4,
                        y: textTop4,
                        isActive: true,
                        dragIndex: zIndex4,
                    });
                    state.editor.imgListSet = true;
                    break;
                case 5:
                    const textTop5 = 0;
                    const zIndex5 = state.editor.dragVideos.length ? state.editor.dragVideos[state.editor.dragVideos.length - 1].zIndex + 1 : 0;
                    state.editor.dragVideos.push({
                        isShow: true,
                        zIndex: zIndex5,
                        y: textTop5,
                        isActive: true,
                        dragIndex: zIndex5,
                    });
                    state.editor.videoSet = true;
                    break;
                case 6:
                    const textTop6 = 0;
                    const zIndex6 = state.editor.dragAudios.length ? state.editor.dragAudios[state.editor.dragAudios.length - 1].zIndex + 1 : 0;
                    state.editor.dragAudios.push({
                        isShow: true,
                        zIndex: zIndex6,
                        y: textTop6,
                        isActive: true,
                        dragIndex: zIndex6,
                    });
                    state.editor.audioSet = true;
                    break;
            }
        },